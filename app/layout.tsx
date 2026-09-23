import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const description = "ChillParents 輕鬆爸媽是香港家長社群。少比較、多陪伴，按地區結伴。開口之前先問：你想我聽，定係想我一齊諗？";

export const metadata: Metadata = {
  metadataBase: new URL("https://chillparents.hk"),
  title: {
    default: "ChillParents 輕鬆爸媽｜香港家長社群",
    template: "%s｜ChillParents 輕鬆爸媽",
  },
  description,
  applicationName: "ChillParents",
  keywords: ["香港家長", "親子", "家長社群", "輕鬆爸媽", "ChillParents"],
  openGraph: {
    title: "ChillParents 輕鬆爸媽｜香港家長社群",
    description,
    locale: "zh_HK",
    type: "website",
    url: "https://chillparents.hk",
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
  url: "https://chillparents.hk",
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
