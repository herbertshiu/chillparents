import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <h2>ChillParents 輕鬆爸媽</h2>
          <p className="muted">香港家長的慢活社群。開口之前，先問一句：你想我聽，定係想我一齊諗？</p>
        </div>
        <div>
          <h2>逛逛</h2>
          <ul>
            <li><Link href="/stories">家長故事</Link></li>
            <li><Link href="/events">活動</Link></li>
            <li><Link href="/groups">地區小組</Link></li>
            <li><Link href="/resources">資源</Link></li>
          </ul>
        </div>
        <div>
          <h2>社群</h2>
          <ul>
            <li><Link href="/about">關於我們</Link></li>
            <li><Link href="/guidelines">社群守則</Link></li>
            <li><Link href="/join">加入</Link></li>
          </ul>
        </div>
        <div>
          <h2>若然很不好過</h2>
          <p className="muted">有立即危險請打 999。想找人聽：撒瑪利亞防止自殺會 2389 2222。明愛向晴軒向晴熱線 18288，由社工接聽。</p>
        </div>
      </div>
      <div className="wrap legal">
        <p>© 2026 ChillParents。故事與活動由家長社群整理，不構成醫療、法律或入學建議。學校日期與服務詳情，請以官方最新公布為準。</p>
      </div>
    </footer>
  );
}
