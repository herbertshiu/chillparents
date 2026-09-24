import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";

const DATABASE_NAME = "chillparents";
const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("請設定 TURSO_DATABASE_URL 和 TURSO_AUTH_TOKEN。");
  process.exit(1);
}

const hostname = new URL(url.replace(/^libsql:\/\//, "https://")).hostname;
const slug = hostname.split(".")[0] ?? "";
if (slug !== DATABASE_NAME && !slug.startsWith(`${DATABASE_NAME}-`)) {
  console.error("TURSO_DATABASE_URL 必須指向名為 chillparents 的資料庫。");
  process.exit(1);
}

const sql = readFileSync(new URL("../lib/parents.sql", import.meta.url), "utf8");
const client = createClient({ url, authToken });
await client.execute(sql);
console.log("chillparents.parents 資料表已就緒。");
