import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://theabsingh.com"),
  title: {
    default: "AI support, custom dashboards and content automation — Ab Singh",
    template: "%s — Ab Singh",
  },
  description: "Three systems for ecommerce operators: AI support agents, custom operations dashboards and content automation.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "https://theabsingh.com",
    siteName: "Ab Singh",
    title: "AI support, custom dashboards and content automation",
    description: "Three focused systems for ecommerce operations—connected, automated and owned outright.",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "AI systems for ecommerce operations — Ab Singh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI support, custom dashboards and content automation — Ab Singh",
    description: "Three focused systems for ecommerce operations—connected, automated and owned outright.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
