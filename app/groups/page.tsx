import type { Metadata } from "next";
import Link from "next/link";
import { GroupExplorer } from "@/components/GroupExplorer";
import { PageHeader } from "@/components/PageHeader";
import { groups } from "@/lib/content";

export const metadata: Metadata = {
  title: "地區小組",
  description: "ChillParents 覆蓋香港十八區。先找你住的區，再決定要不要出現。",
};

export default async function GroupsPage({ searchParams }: { searchParams: Promise<{ region?: string }> }) {
  const { region } = await searchParams;
  return (
    <>
      <PageHeader
        kicker="地區小組"
        title="十八區，每區都有人肯準時出現。"
        lede="小組由家長輪流主持，不收費、不招生。北區仍在找第二位主持人，其餘各區都可以先來坐。"
        crumb={<><Link href="/">首頁</Link> / 地區小組</>}
      />
      <GroupExplorer groups={groups} initialRegion={region} />
    </>
  );
}
