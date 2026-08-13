import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://theabsingh.com"),
  title: {
    default: "Ab Singh — AI automation and systems for ecom brands",
    template: "%s — Ab Singh",
  },
  description: "Backend automation, reporting, support, and catalog systems for ecommerce operators.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "https://theabsingh.com",
    siteName: "Ab Singh",
    title: "AI automation and systems for ecom brands",
    description: "Backend infrastructure ecom operators own outright.",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Ab Singh — AI automation and systems for ecom brands" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ab Singh — AI automation and systems for ecom brands",
    description: "Backend infrastructure ecom operators own outright.",
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
