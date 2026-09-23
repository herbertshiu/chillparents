import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Story } from "@/lib/types";

export function StoryCard({ story, lead = false, saved = false }: { story: Story; lead?: boolean; saved?: boolean }) {
  return (
    <Link href={`/stories/${story.slug}`} className={lead ? "story-card story-card-lead" : "story-card"}>
      <div className="mark" style={{ background: story.wash, color: story.ink }}>
        <span className="mark-label">{story.topic}</span>
        <span className="mark-char">{story.mark}</span>
      </div>
      <div className="story-copy">
        <p className="eyebrow">{story.district} · {story.minutes} 分鐘</p>
        <h3>{story.title}</h3>
        <p className="excerpt">{story.excerpt}</p>
        <p className="meta">{story.author} · {story.role} · {formatDate(story.date)}{saved ? " · 已收藏" : ""}</p>
      </div>
    </Link>
  );
}
