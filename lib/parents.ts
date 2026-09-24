import type { Client } from "@libsql/client";
import { childAges, getEvent, groups, joinRoles, joinTopics } from "@/lib/content";

export const PARENTS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS parents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  district TEXT NOT NULL,
  email TEXT NOT NULL,
  child_age TEXT,
  topics TEXT NOT NULL,
  intro_card TEXT NOT NULL,
  event_title TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
`.trim();

export type ParentSubmission = {
  name: string;
  role: string;
  district: string;
  email: string;
  age: string;
  topics: string[];
  eventSlug?: string;
};

export type StoredParent = {
  id: number;
  name: string;
  role: string;
  district: string;
  email: string;
  age: string;
  topics: string[];
  card: string;
  eventTitle?: string;
};

const roles = new Set<string>(joinRoles);
const ages = new Set<string>(childAges);
const topicSet = new Set<string>(joinTopics);
const districts = new Set(groups.map((group) => group.district));

export function buildIntroCard(input: {
  name: string;
  role: string;
  district: string;
  email: string;
  age: string;
  topics: string[];
  eventTitle?: string;
}): string {
  const ageLine = input.age && input.age !== "不想說" ? `孩子大概是${input.age}。\n` : "";
  const eventLine = input.eventTitle ? `我想先參加：${input.eventTitle}。\n` : "";
  return `大家好，我是${input.name}，${input.role}，常在${input.district}。\n${ageLine}${eventLine}我想傾：${input.topics.join("、")}。\n我願意守 ChillParents 的約定：開口之前先問「你想我聽，定係想我一齊諗？」\n聯絡電郵：${input.email}`;
}

export function parseParentSubmission(input: ParentSubmission): { ok: true; parent: Omit<StoredParent, "id"> } | { ok: false; error: string } {
  const name = input.name.trim();
  const email = input.email.trim();
  const role = input.role.trim();
  const district = input.district.trim();
  const age = input.age.trim() || "不想說";
  const topics = [...new Set(input.topics.map((topic) => topic.trim()).filter(Boolean))];

  if (!name || name.length > 40) return { ok: false, error: "請填寫稱呼，四十字以內。" };
  if (!roles.has(role)) return { ok: false, error: "請選擇你的身份。" };
  if (!districts.has(district)) return { ok: false, error: "請選擇地區。" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return { ok: false, error: "電郵格式好像不完整。" };
  if (!ages.has(age)) return { ok: false, error: "請選擇孩子年齡。" };
  if (topics.length === 0 || topics.some((topic) => !topicSet.has(topic))) return { ok: false, error: "請至少選一個想傾的話題。" };

  const event = input.eventSlug ? getEvent(input.eventSlug) : undefined;
  if (input.eventSlug && !event) return { ok: false, error: "找不到這場活動。" };

  return {
    ok: true,
    parent: {
      name,
      role,
      district,
      email,
      age,
      topics,
      eventTitle: event?.title,
      card: buildIntroCard({ name, role, district, email, age, topics, eventTitle: event?.title }),
    },
  };
}

export async function ensureParentsTable(client: Client) {
  await client.execute(PARENTS_TABLE_SQL);
}

export async function insertParent(client: Client, parent: Omit<StoredParent, "id">): Promise<StoredParent> {
  await ensureParentsTable(client);
  const result = await client.execute({
    sql: `INSERT INTO parents (name, role, district, email, child_age, topics, intro_card, event_title)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          RETURNING id`,
    args: [
      parent.name,
      parent.role,
      parent.district,
      parent.email,
      parent.age,
      JSON.stringify(parent.topics),
      parent.card,
      parent.eventTitle ?? null,
    ],
  });
  const id = Number(result.rows[0]?.id);
  if (!Number.isInteger(id)) throw new Error("未能寫入家長資料。");
  return { ...parent, id };
}
