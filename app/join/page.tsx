import type { Metadata } from "next";
import Link from "next/link";
import { JoinForm } from "@/components/JoinForm";
import { PageHeader } from "@/components/PageHeader";
import { getEvent } from "@/lib/content";

export const metadata: Metadata = {
  title: "加入社群",
  description: "寫一張 ChillParents 茶聚自我介紹卡，選擇地區，帶著守則去第一次聚會。",
};

export default async function JoinPage({ searchParams }: { searchParams: Promise<{ district?: string; event?: string }> }) {
  const { district, event } = await searchParams;
  const eventTitle = event ? getEvent(event)?.title : undefined;

  return (
    <>
      <PageHeader
        kicker="加入"
        title="先寫一張可以遞出去的自我介紹。"
        lede="不用填長表格等審批。你提交的資料會存入 ChillParents 資料庫，網站不會公開。"
        crumb={<><Link href="/">首頁</Link> / 加入</>}
      />
      <div className="wrap section article">
        <aside className="side-card">
          <h2>加入之後</h2>
          <p>1. 選一個地區小組。</p>
          <p>2. 帶著介紹卡出現，或先參加網上的「聽定諗」練習。</p>
          <p>3. 若你想主持，從北區或主持人手冊開始。</p>
          <p style={{ marginTop: "0.8rem" }}><Link href="/guidelines">加入前請讀守則</Link></p>
        </aside>
        <JoinForm district={district} eventSlug={event} eventTitle={eventTitle} />
      </div>
    </>
  );
}
