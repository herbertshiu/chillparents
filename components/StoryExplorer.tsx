"use client";

import { useEffect, useMemo, useState } from "react";
import { StoryCard } from "@/components/StoryCard";
import { storyTopics, type Story, type StoryTopic } from "@/lib/types";

const SAVED_KEY = "chillparents.saved";

export function StoryExplorer({ stories }: { stories: Story[] }) {
  const [topic, setTopic] = useState<StoryTopic | "全部" | "收藏">("全部");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(SAVED_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed)) setSaved(parsed);
    } catch {
      setSaved([]);
    }
  }, []);

  const visible = useMemo(() => {
    const q = query.trim();
    return stories.filter((story) => {
      const topicOk = topic === "全部" || topic === "收藏" || story.topic === topic;
      const savedOk = topic !== "收藏" || saved.includes(story.slug);
      const text = `${story.title}${story.excerpt}${story.author}${story.district}${story.topic}`;
      const queryOk = !q || text.includes(q);
      return topicOk && savedOk && queryOk;
    });
  }, [stories, topic, query, saved]);

  return (
    <div className="wrap" style={{ paddingBottom: "2.5rem" }}>
      <div className="filters">
        <button className="chip" type="button" aria-pressed={topic === "全部"} onClick={() => setTopic("全部")}>全部</button>
        {storyTopics.map((item) => (
          <button key={item} className="chip" type="button" aria-pressed={topic === item} onClick={() => setTopic(item)}>{item}</button>
        ))}
        <button className="chip" type="button" aria-pressed={topic === "收藏"} onClick={() => setTopic("收藏")}>我的收藏</button>
        <input
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜尋標題、地區或作者"
          aria-label="搜尋故事"
        />
      </div>
      {visible.length === 0 ? (
        <p className="empty">沒有符合的故事。可以換一個主題，或先在故事頁按收藏。</p>
      ) : (
        <div className="card-grid">
          {visible.map((story) => (
            <StoryCard key={story.slug} story={story} saved={saved.includes(story.slug)} />
          ))}
        </div>
      )}
    </div>
  );
}
