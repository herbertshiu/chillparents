"use client";

import { useEffect, useState } from "react";

const SAVED_KEY = "chillparents.saved";

function readSaved() {
  const raw = window.localStorage.getItem(SAVED_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function SaveStory({ slug, title }: { slug: string; title: string }) {
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSaved(readSaved().includes(slug));
    setReady(true);
  }, [slug]);

  function toggle() {
    const next = readSaved().filter((item) => item !== slug);
    if (!saved) next.push(slug);
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    setSaved(!saved);
  }

  return (
    <button className="btn btn-ghost saved" type="button" onClick={toggle} aria-pressed={saved} disabled={!ready}>
      {saved ? `已收藏「${title}」` : "收藏這篇故事"}
    </button>
  );
}
