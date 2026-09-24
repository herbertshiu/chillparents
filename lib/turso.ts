import { createClient, type Client } from "@libsql/client";

const DATABASE_NAME = "chillparents";

export function chillparentsDatabaseName(url: string): string | null {
  const normalized = url.startsWith("libsql://") ? `https://${url.slice("libsql://".length)}` : url;
  let hostname: string;
  try {
    hostname = new URL(normalized).hostname;
  } catch {
    return null;
  }
  const slug = hostname.split(".")[0] ?? "";
  if (slug === DATABASE_NAME || slug.startsWith(`${DATABASE_NAME}-`)) return DATABASE_NAME;
  return null;
}

export function getTurso(): Client {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) {
    throw new Error("缺少 TURSO_DATABASE_URL 或 TURSO_AUTH_TOKEN。");
  }
  if (chillparentsDatabaseName(url) !== DATABASE_NAME) {
    throw new Error("TURSO_DATABASE_URL 必須指向名為 chillparents 的資料庫。");
  }
  return createClient({ url, authToken });
}
