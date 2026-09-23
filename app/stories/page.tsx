import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StoryExplorer } from "@/components/StoryExplorer";
import { stories } from "@/lib/content";

export const metadata: Metadata = {
  title: "家長故事",
  description: "香港家長寫下不補習、屋邨黃昏、小一早晨和星期六路線。少比較，多具體經驗。",
};

export default function StoriesPage() {
  return (
    <>
      <PageHeader
        kicker="故事"
        title="家長自己寫的，不是課程摘錄。"
        lede="每篇都來自一個地區小組。你可以按主題看，也可以先收藏，留待夜裡孩子睡著再讀。"
        crumb={<><Link href="/">首頁</Link> / 家長故事</>}
      />
      <StoryExplorer stories={stories} />
    </>
  );
}
