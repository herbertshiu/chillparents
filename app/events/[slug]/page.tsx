import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, getEvent } from "@/lib/content";
import { eventDateParts, formatDate, hongKongTodayISO } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "找不到活動" };
  return { title: event.title, description: event.summary };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  const parts = eventDateParts(event.date);
  const past = event.date < hongKongTodayISO();

  return (
    <article className="wrap section article">
      <aside className="side-card">
        <p className="kicker">{event.type}</p>
        <h2>{parts.month}月{parts.day}日 · {parts.weekday}</h2>
        <p>{event.time}</p>
        <p>{event.place}</p>
        <p>{event.region} · {event.district}</p>
        <p>名額：{event.spots}</p>
        <p>主持：{event.host}</p>
        {past ? <p className="past-flag">這場已結束，看看其他活動。</p> : null}
        <p style={{ marginTop: "1rem" }}>
          <Link className="btn btn-primary" href={past ? "/events" : `/join?event=${event.slug}`}>
            {past ? "返回活動一覽" : "用這場活動做介紹卡"}
          </Link>
        </p>
      </aside>
      <div className="prose">
        <p className="crumb"><Link href="/">首頁</Link> / <Link href="/events">活動</Link></p>
        <h1 className="article-title">{event.title}</h1>
        <p>{event.summary}</p>
        {event.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <h2>可以帶</h2>
        <ul>
          {event.bring.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="callout">
          <strong>現場約定</strong>
          <p>不派廣告，不評審別人的學校和補習。別人說難事時，先問想被聽，還是想一起想辦法。</p>
        </div>
      </div>
    </article>
  );
}
