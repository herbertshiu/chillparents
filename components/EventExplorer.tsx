"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/EventCard";
import { eventTypes, type CommunityEvent, type EventType } from "@/lib/types";

export function EventExplorer({ events, todayISO }: { events: CommunityEvent[]; todayISO: string }) {
  const [type, setType] = useState<EventType | "全部">("全部");
  const visible = useMemo(
    () => events.filter((event) => type === "全部" || event.type === type),
    [events, type],
  );

  return (
    <div className="wrap" style={{ paddingBottom: "2.5rem" }}>
      <div className="filters">
        <button className="chip" type="button" aria-pressed={type === "全部"} onClick={() => setType("全部")}>全部</button>
        {eventTypes.map((item) => (
          <button key={item} className="chip" type="button" aria-pressed={type === item} onClick={() => setType(item)}>{item}</button>
        ))}
      </div>
      {visible.length === 0 ? <p className="empty">這類活動暫時未有場次。</p> : (
        <div className="event-grid">
          {visible.map((event) => <EventCard key={event.slug} event={event} todayISO={todayISO} />)}
        </div>
      )}
    </div>
  );
}
