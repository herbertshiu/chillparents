import Link from "next/link";
import { eventDateParts } from "@/lib/format";
import type { CommunityEvent } from "@/lib/types";

export function EventCard({ event, todayISO }: { event: CommunityEvent; todayISO: string }) {
  const parts = eventDateParts(event.date);
  const past = event.date < todayISO;
  return (
    <Link href={`/events/${event.slug}`} className="event-card">
      <div className="date-block">
        <span className="date-day">{parts.day}</span>
        <span className="date-rest">{parts.month}月 · {parts.weekday}</span>
        {past ? <span className="past-flag">已結束</span> : null}
      </div>
      <div className="event-copy">
        <p className="eyebrow">{event.type} · {event.region}</p>
        <h3>{event.title}</h3>
        <p className="excerpt">{event.time} · {event.place}</p>
      </div>
    </Link>
  );
}
