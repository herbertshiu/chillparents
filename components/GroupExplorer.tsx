"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { regions, type Group, type Region } from "@/lib/types";

export function GroupExplorer({ groups, initialRegion }: { groups: Group[]; initialRegion?: string }) {
  const starting = regions.includes(initialRegion as Region) ? (initialRegion as Region) : "全部";
  const [region, setRegion] = useState<Region | "全部">(starting);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim();
    return groups.filter((group) => {
      const regionOk = region === "全部" || group.region === region;
      const text = `${group.district}${group.name}${group.blurb}`;
      return regionOk && (!q || text.includes(q));
    });
  }, [groups, region, query]);

  return (
    <div className="wrap" style={{ paddingBottom: "2.5rem" }}>
      <div className="filters">
        <button className="chip" type="button" aria-pressed={region === "全部"} onClick={() => setRegion("全部")}>全港</button>
        {regions.map((item) => (
          <button key={item} className="chip" type="button" aria-pressed={region === item} onClick={() => setRegion(item)}>{item}</button>
        ))}
        <input className="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋地區，例如沙田" aria-label="搜尋地區小組" />
      </div>
      {visible.length === 0 ? <p className="empty">找不到這個地區。十八區都會慢慢出現，你也可以先做主持人。</p> : (
        <div className="card-grid">
          {visible.map((group) => (
            <article key={group.district} className="info-card">
              <p className="eyebrow">{group.region} · <span className={group.status === "開放" ? "status" : "status wait"}>{group.status}</span></p>
              <h3>{group.name}</h3>
              <p>{group.blurb}</p>
              <p className="meta">{group.members} 位家長 · {group.rhythm}</p>
              <p>下一場：{group.next}</p>
              <p style={{ marginTop: "0.8rem" }}>
                <Link className="btn btn-ghost" href={`/join?district=${encodeURIComponent(group.district)}`}>加入{group.district}</Link>
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
