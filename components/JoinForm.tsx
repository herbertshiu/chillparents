"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { saveParent } from "@/app/join/actions";
import { childAges, groups, joinRoles, joinTopics } from "@/lib/content";

const INTRO_KEY = "chillparents.intro";

type Intro = {
  name: string;
  role: string;
  district: string;
  email: string;
  age: string;
  topics: string[];
  card: string;
};

export function JoinForm({ district, eventSlug, eventTitle }: { district?: string; eventSlug?: string; eventTitle?: string }) {
  const knownDistrict = district && groups.some((group) => group.district === district) ? district : "";
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>(joinRoles[0]);
  const [area, setArea] = useState(knownDistrict);
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<string>("不想說");
  const [topics, setTopics] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [intro, setIntro] = useState<Intro | null>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(INTRO_KEY);
    if (!raw) return;
    try {
      setIntro(JSON.parse(raw) as Intro);
    } catch {
      setIntro(null);
    }
  }, []);

  const cardPreview = useMemo(() => intro?.card ?? "", [intro]);

  function toggleTopic(topic: string) {
    setTopics((current) => current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!agreed) {
      setError("加入之前，請先同意社群守則。");
      return;
    }
    setSaving(true);
    setError("");
    const result = await saveParent({ name, role, district: area, email, age, topics, eventSlug });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const next = {
      name: result.parent.name,
      role: result.parent.role,
      district: result.parent.district,
      email: result.parent.email,
      age: result.parent.age,
      topics: result.parent.topics,
      card: result.parent.card,
    };
    window.localStorage.setItem(INTRO_KEY, JSON.stringify(next));
    setIntro(next);
    setCopied(false);
  }

  async function copyCard() {
    if (!intro) return;
    try {
      await navigator.clipboard.writeText(intro.card);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function rewrite() {
    if (!intro) return;
    setName(intro.name);
    setRole(intro.role);
    setArea(intro.district);
    setEmail(intro.email);
    setAge(intro.age);
    setTopics(intro.topics);
    setAgreed(true);
    setIntro(null);
  }

  return (
    <div className="stack">
      {eventTitle ? <p className="callout">你正在為這場活動準備自我介紹：<strong>{eventTitle}</strong></p> : null}
      {intro ? (
        <section className="intro-card" aria-live="polite">
          <p className="kicker">你的茶聚自我介紹卡</p>
          <pre>{cardPreview}</pre>
          <div className="hero-actions">
            <button className="btn btn-primary" type="button" onClick={copyCard}>{copied ? "已複製" : "複製介紹卡"}</button>
            <button className="btn btn-ghost" type="button" onClick={rewrite}>重新填寫</button>
          </div>
          <p>資料已存入 ChillParents 資料庫，網站不會公開。這部裝置仍留著介紹卡，方便第一次茶聚時出示，或複製給地區主持人。</p>
        </section>
      ) : (
      <form className="form" onSubmit={onSubmit} noValidate>
        <label className="field">
          <span>怎麼稱呼</span>
          <input value={name} onChange={(event) => setName(event.target.value)} name="name" autoComplete="nickname" required />
        </label>
        <label className="field">
          <span>你是</span>
          <select value={role} onChange={(event) => setRole(event.target.value)} name="role">
            {joinRoles.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="field">
          <span>地區</span>
          <select value={area} onChange={(event) => setArea(event.target.value)} name="district" required>
            <option value="">請選擇</option>
            {groups.map((group) => <option key={group.district} value={group.district}>{group.region} · {group.district}</option>)}
          </select>
        </label>
        <label className="field">
          <span>電郵</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field">
          <span>孩子年齡（可選）</span>
          <select value={age} onChange={(event) => setAge(event.target.value)} name="age">
            {childAges.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend>最想傾的話題</legend>
          <div className="checks">
            {joinTopics.map((topic) => (
              <label key={topic} className="check">
                <input type="checkbox" checked={topics.includes(topic)} onChange={() => toggleTopic(topic)} />
                {topic}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="check" style={{ borderRadius: 12 }}>
          <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} />
          我已讀並同意 <Link href="/guidelines">社群守則</Link>
        </label>
        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? "正在儲存…" : "產生自我介紹卡"}</button>
        <p className="muted">稱呼、地區、電郵和話題會存入 ChillParents 資料庫，只供地區主持人聯絡。網站不會公開這些資料，也不會轉給商業機構。</p>
      </form>
      )}
    </div>
  );
}
