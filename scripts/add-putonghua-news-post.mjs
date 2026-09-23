import { readFile, writeFile } from "node:fs/promises";

const NEWS_PATH = new URL("../content/news/putonghua.json", import.meta.url);
const LOOKBACK_DAYS = Number(process.env.LOOKBACK_DAYS ?? 240);
const MAX_ITEMS = 5;
const USER_AGENT = "ChillParentsNewsBot/1.0 (+https://chillparents.hk)";

const FEEDS = [
  { name: "香港特區政府新聞公報", url: "https://www.info.gov.hk/gia/rss/general_zh.xml" },
  { name: "香港電台本地新聞", url: "https://rthk.hk/rthk/news/rss/c_expressnews_clocal.xml" },
  { name: "香港電台大中華新聞", url: "https://rthk.hk/rthk/news/rss/c_expressnews_greaterchina.xml" },
];

const SEARCHES = ["普通話 教學", "普通話 學習", "小學 普通話", "幼稚園 普通話", "普通話科"];

const putonghuaPattern = /普通話|普通话|Putonghua|漢語拼音/i;
const learningPattern = /學|教|課程|拼音|小學|中學|幼稚園|學生|家長|朗讀|課本|教師|語文|培訓|自學|水平|經驗/;

function hongKongToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function isoTime(iso) {
  return new Date(`${iso}T00:00:00+08:00`).getTime();
}

function formatChineseDate(iso) {
  const [year, month, day] = iso.split("-");
  return `${Number(year)}年${Number(month)}月${Number(day)}日`;
}

function decodeXml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block, name) {
  const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function isRelevantTitle(title) {
  if (!title || title.length < 6 || /^\[pdf\]$/i.test(title)) return false;
  if (!putonghuaPattern.test(title)) return false;
  const withoutDeliveryNote = title.replace(/[（(]\s*普通話\s*[）)]/g, "");
  return learningPattern.test(withoutDeliveryNote);
}

function preferredUrl(url) {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    if (parsed.pathname.includes("/sc/")) return false;
    return true;
  } catch {
    return false;
  }
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "text/html, application/xml, text/xml" },
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

function itemsFromRss(xml, sourceName) {
  const items = [];
  for (const block of xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? []) {
    const title = tag(block, "title").replace(/\s+-\s+[^-]+$/, "").trim();
    const href = tag(block, "link");
    const pubDate = tag(block, "pubDate");
    const source = tag(block, "source") || sourceName;
    if (!pubDate || !isRelevantTitle(title) || !preferredUrl(href)) continue;
    const date = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Hong_Kong",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(pubDate));
    items.push({ title, href, date, source });
  }
  return items;
}

function itemsFromSearch(html, sourceName) {
  const items = [];
  for (const chunk of html.split("itemDetailsTitle resultTrack").slice(1)) {
    const titleMatch = chunk.match(/<span>\s*([\s\S]*?)\s*<\/span>/);
    const hrefMatch = chunk.match(/href="(https?:\/\/[^"]+)"/);
    const dateMatch = chunk.slice(0, 3000).match(/20\d{2}-\d{2}-\d{2}/);
    if (!titleMatch || !hrefMatch || !dateMatch) continue;
    const title = decodeXml(titleMatch[1]).replace(/\s+-\s+[^-]+$/, "").trim();
    const href = hrefMatch[1];
    if (!isRelevantTitle(title) || !preferredUrl(href)) continue;
    items.push({ title, href, date: dateMatch[0], source: sourceName });
  }
  return items;
}

async function collectItems() {
  const found = [];
  let succeeded = 0;
  for (const feed of FEEDS) {
    try {
      found.push(...itemsFromRss(await fetchText(feed.url), feed.name));
      succeeded += 1;
    } catch (error) {
      console.error(`RSS failed: ${feed.url} (${error.message})`);
    }
  }
  for (const query of SEARCHES) {
    const url = `https://www.search.gov.hk/result?q=${encodeURIComponent(query)}&ui_lang=zh-hk`;
    try {
      found.push(...itemsFromSearch(await fetchText(url), "香港政府搜尋"));
      succeeded += 1;
    } catch (error) {
      console.error(`Search failed: ${query} (${error.message})`);
    }
  }
  if (succeeded === 0) {
    throw new Error("全部新聞來源都無法讀取。");
  }
  return found;
}

function selectItems(candidates, usedUrls, today) {
  const cutoff = isoTime(today) - LOOKBACK_DAYS * 24 * 60 * 60 * 1000;
  const seen = new Set(usedUrls);
  const selected = [];
  const sorted = [...candidates].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "zh-Hant"));
  for (const item of sorted) {
    if (seen.has(item.href)) continue;
    if (isoTime(item.date) < cutoff || isoTime(item.date) > isoTime(today) + 24 * 60 * 60 * 1000) continue;
    seen.add(item.href);
    selected.push(item);
    if (selected.length === MAX_ITEMS) break;
  }
  return selected;
}

function buildPost(items, today) {
  const listed = items.map((item) => `「${item.title}」`).join("、");
  const excerptTitle = items[0].title.length > 28 ? `${items[0].title.slice(0, 28)}…` : items[0].title;
  return {
    slug: `putonghua-news-${today}`,
    title: `普通話學習消息｜${formatChineseDate(today)}`,
    excerpt: `整理了 ${items.length} 則與在香港學習普通話有關的公開資料，當中包括「${excerptTitle}」。`,
    topic: "學習",
    author: "ChillParents 編輯",
    role: "新聞整理",
    district: "全港",
    date: today,
    minutes: Math.max(3, Math.min(6, items.length + 1)),
    mark: "聞",
    wash: "#e7e2f2",
    ink: "#3d315c",
    body: [
      `這篇在${formatChineseDate(today)}由網站的自動整理程序寫成。材料來自香港特區政府新聞公報、香港電台新聞，以及香港政府搜尋裡和學習普通話有關的公開頁面。`,
      `今次收錄 ${items.length} 則：${listed}。這裡只留下標題和連結，沒有轉載內文，也不是課程推薦。日期和細節請以原頁為準。`,
      "廣東話仍然可以是家裡的語言。若這些消息讓你想找人商量，先問一句：你想我聽，定係想我一齊諗？",
    ],
    links: items.map((item) => ({ label: `${item.title}（${item.source}，${formatChineseDate(item.date)}）`, href: item.href })),
    sourceUrls: items.map((item) => item.href),
  };
}

const posts = JSON.parse(await readFile(NEWS_PATH, "utf8"));
if (!Array.isArray(posts)) throw new Error("content/news/putonghua.json 必須是陣列。");

const today = hongKongToday();
if (posts.some((post) => post.slug === `putonghua-news-${today}`)) {
  console.log(`今天已有文章 ${today}，不再新增。`);
  process.exit(0);
}

const usedUrls = posts.flatMap((post) => post.sourceUrls ?? []);
const selected = selectItems(await collectItems(), usedUrls, today);
if (selected.length === 0) {
  console.log("沒有新的普通話學習資料，網站保持不變。");
  process.exit(0);
}

posts.unshift(buildPost(selected, today));
await writeFile(NEWS_PATH, `${JSON.stringify(posts, null, 2)}\n`);
console.log(`已新增 putonghua-news-${today}，收錄 ${selected.length} 則。`);
for (const item of selected) console.log(`- ${item.date} ${item.title}`);
