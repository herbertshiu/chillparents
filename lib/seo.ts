export const SITE_ORIGIN = "https://www.chillparents.hk";

const BRAND = "ChillParents 輕鬆爸媽";
const LONG_SUFFIX = `｜香港家長社群 ${BRAND}，少比較、多陪伴，十八區小組`;
const SHORT_SUFFIX = `｜${BRAND}`;
const DESCRIPTION_TAIL =
  "ChillParents 輕鬆爸媽是香港家長社群，按十八區結伴，少比較、多陪伴。開口之前先問：你想我聽，定係想我一齊諗？全文以繁體中文寫給香港家長，歡迎不同形狀的家庭一起。";

export function seoTitle(page: string): string {
  let title = `${page}${LONG_SUFFIX}`;
  if (title.length > 70) {
    title = `${page}${SHORT_SUFFIX}`;
    if (title.length > 70) {
      const room = 70 - SHORT_SUFFIX.length;
      title = `${page.slice(0, room)}${SHORT_SUFFIX}`;
    }
  }
  if (title.length < 50) title = `${page}${LONG_SUFFIX}，歡迎你加入社群。`.slice(0, 70);
  return title;
}

export function seoDescription(lead: string): string {
  const clean = lead.replace(/\s+/g, " ").trim().replace(/。+$/, "");
  const text = `${clean}。${DESCRIPTION_TAIL}`;
  return text.length > 160 ? `${text.slice(0, 159)}…` : text;
}
