import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { guidelines } from "@/lib/content";

export const metadata: Metadata = {
  title: "社群守則",
  description: "ChillParents 的約定：保護孩子私隱、先問聽定諗、禁止硬銷、不做診斷。",
};

export default function GuidelinesPage() {
  return (
    <>
      <PageHeader
        kicker="守則"
        title="說好的事，比氣氛更重要。"
        lede="守則很短。它讓陌生人可以坐在同一張長凳上，而不必先變成朋友。"
        crumb={<><Link href="/">首頁</Link> / 社群守則</>}
      />
      <div className="wrap section" style={{ maxWidth: "46rem" }}>
        {guidelines.map((item) => (
          <section key={item.title} className="guideline">
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </section>
        ))}
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/join">同意並寫介紹卡</Link>
          <Link className="btn btn-ghost" href="/resources/care-for-carers">情緒危機請看這裡</Link>
        </div>
      </div>
    </>
  );
}
