import type { ReactNode } from "react";

export function PageHeader({
  kicker,
  title,
  lede,
  crumb,
}: {
  kicker: string;
  title: string;
  lede: string;
  crumb?: ReactNode;
}) {
  return (
    <header className="wrap page-header">
      {crumb ? <p className="crumb">{crumb}</p> : null}
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
    </header>
  );
}
