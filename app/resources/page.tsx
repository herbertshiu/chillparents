import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { resources } from "@/lib/content";

export const metadata: Metadata = {
  title: "資源",
  description: "小一入學筆記、社區支援、低消費週末，以及照顧者求助熱線。",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        kicker="資源"
        title="先用公共網絡，再決定要不要付錢。"
        lede="這些筆記由家長整理，方便你找對窗口。日期、資格和服務安排，一律以政府及機構最新公布為準。"
        crumb={<><Link href="/">首頁</Link> / 資源</>}
      />
      <div className="wrap section resource-grid">
        {resources.map((resource) => (
          <Link key={resource.slug} href={`/resources/${resource.slug}`} className="resource-card card-copy">
            <p className="eyebrow">{resource.kicker}</p>
            <h3>{resource.title}</h3>
            <p>{resource.summary}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
