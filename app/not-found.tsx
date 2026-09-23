import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap page-header" style={{ paddingBottom: "4rem" }}>
      <p className="kicker">404</p>
      <h1>這頁不在社區裡。</h1>
      <p className="lede">連結可能舊了。回到首頁，或去看看仍然坐得下的活動。</p>
      <div className="hero-actions">
        <Link className="btn btn-primary" href="/">回首頁</Link>
        <Link className="btn btn-ghost" href="/events">看看活動</Link>
      </div>
    </div>
  );
}
