"use server";

import { insertParent, parseParentSubmission, type ParentSubmission, type StoredParent } from "@/lib/parents";
import { getTurso } from "@/lib/turso";

export async function saveParent(input: ParentSubmission): Promise<{ ok: true; parent: StoredParent } | { ok: false; error: string }> {
  const parsed = parseParentSubmission(input);
  if (!parsed.ok) return parsed;
  try {
    const parent = await insertParent(getTurso(), parsed.parent);
    return { ok: true, parent };
  } catch (error) {
    console.error("saveParent failed", error instanceof Error ? error.message : "unknown");
    return { ok: false, error: "暫時未能儲存資料，請稍後再試。" };
  }
}
