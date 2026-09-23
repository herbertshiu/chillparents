import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "關於我們",
  description: "ChillParents 輕鬆爸媽為何出現：一個少比較、先傾聽的香港家長社群。",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="關於"
        title="輕鬆，不是不管孩子。"
        lede="是我們終於可以在別人面前，承認今天只是撐過去了。"
        crumb={<><Link href="/">首頁</Link> / 關於</>}
      />
      <div className="wrap section split">
        <article className="info-card">
          <h2>從一句話開始</h2>
          <p>2026 年，幾個住在不同區的家長發現，自己的群組愈來愈像成績公布欄。有人提出另開一個地方，規則只有一句：開口之前先問，你想我聽，定係想我一齊諗？</p>
          <p>ChillParents 就這樣留下。名字裡的 chill，不是叫人放棄，是把比較的音量調低。</p>
        </article>
        <article className="info-card">
          <h2>誰可以來</h2>
          <p>媽媽、爸爸、準父母、祖父母，以及其他在孩子生活裡穩定出現的照顧者。活動以廣東話為主，也歡迎用普通話或英語慢慢說。</p>
          <p>單親、重組、跨地區、有特殊需要孩子的家庭，都不必先解釋自己「算不算正常」。</p>
        </article>
        <article className="info-card">
          <h2>我們不做的事</h2>
          <p>不招生、不賣課程、不用孩子的樣貌做宣傳。網站上的故事用化名，地區是真的，學校全名不會出現。</p>
          <p>健康、危機和入學的正式答案，留給專業人士和官方公告。我們負責把人帶到那些門口，而不是取代他們。</p>
        </article>
      </div>
      <section className="wrap section prose" style={{ paddingTop: 0 }}>
        <h2>社群怎樣運作</h2>
        <p>每位成員先寫一張自我介紹卡，選擇地區。小組由兩位家長主持，固定節奏見面，可以是茶聚、公園或一小時網上練習。主持人不是專家，職責是看時間、認人，以及在對話變成推銷或評審時打斷。</p>
        <p>想幫忙把北區小組開起來，或想知道守則的全文，可以從下面兩頁開始。</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/join">寫介紹卡</Link>
          <Link className="btn btn-ghost" href="/guidelines">看社群守則</Link>
          <Link className="btn btn-ghost" href="/resources/host-a-group">主持人手冊</Link>
        </div>
      </section>
    </>
  );
}
