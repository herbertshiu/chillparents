import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { seoDescription, seoTitle, SITE_ORIGIN } from "@/lib/seo";
import "./globals.css";

const title = seoTitle("輕鬆爸媽");
const description = seoDescription("ChillParents 輕鬆爸媽是香港家長社群，少比較、多陪伴，按地區結伴");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: title,
    template: "%s｜ChillParents 輕鬆爸媽",
  },
  description,
  alternates: { canonical: "./" },
  applicationName: "ChillParents",
  keywords: ["香港家長", "親子", "家長社群", "輕鬆爸媽", "ChillParents"],
  openGraph: {
    title,
    description,
    locale: "zh_HK",
    type: "website",
    url: SITE_ORIGIN,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4efe6",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ChillParents 輕鬆爸媽",
  url: SITE_ORIGIN,
  description,
  areaServed: "HK",
  inLanguage: "zh-Hant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-HK">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="XbSVRTEG/j0dCQtt/FNdTw" async />
      </head>
      <body>
        <a className="skip" href="#main">跳至主要內容</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
