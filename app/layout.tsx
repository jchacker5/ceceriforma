import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter, Merriweather_Sans } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweatherSans = Merriweather_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Steven V. Ceceri for State Rep - 8th Bristol District",
  description:
    "Common-sense leadership for the South Coast. Vote Steven V. Ceceri for Massachusetts State Representative.",
  manifest: "/manifest.json",
  generator: "v0.dev",
};

// Next.js 15+ requires viewport and themeColor to be exported separately
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const themeColor = "#0E4D92";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${merriweatherSans.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#0E4D92" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
