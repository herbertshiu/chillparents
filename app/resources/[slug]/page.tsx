import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResource, resources } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return { title: "找不到資源" };
  return { title: resource.title, description: resource.summary };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  return (
    <article className="wrap section" style={{ maxWidth: "46rem" }}>
      <p className="crumb"><Link href="/">首頁</Link> / <Link href="/resources">資源</Link></p>
      <p className="kicker">{resource.kicker}</p>
      <h1 className="article-title">{resource.title}</h1>
      <p className="lede">{resource.summary}</p>
      <div className="prose">
        {resource.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.links ? (
              <ul className="link-list">
                {section.links.map((link) => (
                  <li key={link.href}><a href={link.href} target="_blank" rel="noreferrer">{link.label}</a></li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
