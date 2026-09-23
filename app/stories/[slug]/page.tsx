import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SaveStory } from "@/components/SaveStory";
import { StoryCard } from "@/components/StoryCard";
import { getStory, relatedStories, stories } from "@/lib/content";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "找不到故事" };
  return { title: story.title, description: story.excerpt };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();
  const related = relatedStories(story.slug);

  return (
    <article className="wrap section article">
      <div>
        <p className="crumb"><Link href="/">首頁</Link> / <Link href="/stories">家長故事</Link></p>
        <div className="mark" style={{ background: story.wash, color: story.ink, borderRadius: 18, minHeight: "16rem" }}>
          <span className="mark-label">{story.topic}</span>
          <span className="mark-char">{story.mark}</span>
        </div>
      </div>
      <div className="prose">
        <p className="kicker">{story.district}</p>
        <h1 className="article-title">{story.title}</h1>
        <p className="meta-row">
          <span>{story.author} · {story.role}</span>
          <span>{formatDate(story.date)}</span>
          <span>約 {story.minutes} 分鐘</span>
        </p>
        {story.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="callout">
          <strong>聽定諗</strong>
          <p>如果這篇讓你想起自己的事，跟小組說的時候可以先講：你想別人聽，還是想一起想辦法。</p>
        </div>
        <SaveStory slug={story.slug} title={story.title} />
        <h2>接著可以讀</h2>
        <div className="stack">
          {related.map((item) => <StoryCard key={item.slug} story={item} />)}
        </div>
      </div>
    </article>
  );
}
