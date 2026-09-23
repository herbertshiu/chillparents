import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { StoryCard } from "@/components/StoryCard";
import { events, groups, principles, stories, totalMembers, voices, weeklyQuestion } from "@/lib/content";
import { hongKongTodayISO } from "@/lib/format";
import { regions } from "@/lib/types";

export default function HomePage() {
  const todayISO = hongKongTodayISO();
  const featured = stories.slice(0, 3);
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
  const members = totalMembers();

  return (
    <>
      <section className="wrap hero">
        <div>
          <p className="kicker">香港家長社群 · 二〇二六</p>
          <h1>放學之後，總要有一個地方可以老實說「我好攰」。</h1>
          <p className="lede">
            ChillParents 是給爸媽、準父母和日常照顧者的社區。我們按地區結伴，交換真實經驗，並且約定：開口之前先問一句「你想我聽，定係想我一齊諗？」
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/join">加入社群</Link>
            <Link className="btn btn-ghost" href="/events">看看即將舉行的活動</Link>
          </div>
        </div>
        <aside className="question-card">
          <div>
            <p className="kicker">本週一問</p>
            <blockquote>{weeklyQuestion.prompt}</blockquote>
          </div>
          <p>{weeklyQuestion.note}</p>
        </aside>
      </section>

      <section className="wrap stats" aria-label="社群現況">
        <div className="stat"><strong>{groups.length}</strong><span>區都有小組</span></div>
        <div className="stat"><strong>{members}</strong><span>位家長在名單上</span></div>
        <div className="stat"><strong>{events.length}</strong><span>場即將可以坐下的活動</span></div>
        <div className="stat"><strong>0</strong><span>張硬銷單張</span></div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <div>
            <p className="kicker">家長故事</p>
            <h2>寫給同樣在撐的人</h2>
          </div>
          <Link href="/stories">全部故事</Link>
        </div>
        <div className="feature-grid">
          <StoryCard story={featured[0]} lead />
          <div className="feature-side">
            <StoryCard story={featured[1]} />
            <StoryCard story={featured[2]} />
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <div>
            <p className="kicker">活動</p>
            <h2>近期可以出現的地方</h2>
            <p>名額小，遲到沒有懲罰，但不能來請盡早把位子讓出來。</p>
          </div>
          <Link href="/events">活動一覽</Link>
        </div>
        <div className="event-grid">
          {upcoming.map((event) => <EventCard key={event.slug} event={event} todayISO={todayISO} />)}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <div>
            <p className="kicker">約定</p>
            <h2>三件我們說好的事</h2>
          </div>
          <Link href="/guidelines">讀完整守則</Link>
        </div>
        <div className="principles">
          {principles.map((item) => (
            <article key={item.index} className="principle">
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <div>
            <p className="kicker">地區</p>
            <h2>先找到你樓下的人</h2>
          </div>
          <Link href="/groups">十八區小組</Link>
        </div>
        <div className="region-grid">
          {regions.map((region) => (
            <section key={region} className="region-col">
              <h3>{region}</h3>
              <ul>
                {groups.filter((group) => group.region === region).map((group) => (
                  <li key={group.district}>
                    <Link href={`/groups?region=${encodeURIComponent(region)}`}>{group.district}</Link>
                    <span>{group.members} 人</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="voice-grid">
          {voices.map((voice) => (
            <blockquote className="voice" key={voice.by}>
              <p>「{voice.quote}」</p>
              <footer>{voice.by}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="band">
          <div>
            <h2>不用先變成厲害的家長。</h2>
            <p>帶著你的稱呼、地區，和一件想被聽見的事來就夠。</p>
          </div>
          <Link className="btn btn-primary" href="/join">寫一張自我介紹卡</Link>
        </div>
      </section>
    </>
  );
}
