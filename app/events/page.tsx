import type { Metadata } from "next";
import Link from "next/link";
import { EventExplorer } from "@/components/EventExplorer";
import { PageHeader } from "@/components/PageHeader";
import { events } from "@/lib/content";
import { hongKongTodayISO } from "@/lib/format";

export const metadata: Metadata = {
  title: "活動",
  description: "ChillParents 的茶聚、野餐、圖書館靜讀和網上練習。名額小，不做推銷。",
};

export default function EventsPage() {
  const todayISO = hongKongTodayISO();
  const ordered = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <PageHeader
        kicker="活動"
        title="出現一下，就已經算參加。"
        lede="茶聚、野餐、靜讀和工作坊都由地區小組主持。不能來請早說，位子要留給下一個同樣很累的人。"
        crumb={<><Link href="/">首頁</Link> / 活動</>}
      />
      <EventExplorer events={ordered} todayISO={todayISO} />
    </>
  );
}
