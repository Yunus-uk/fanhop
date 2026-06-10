import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import ServiceWorker from "./ServiceWorker";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "FanHop — Soccer 2026 Fan Guide: Cities, Stadiums & Weather",
  description:
    "Your fan companion for the 2026 soccer tournament across the USA, Canada & Mexico. Host-city guides, stadium directions, live weather, local food and things to do between matches.",
  applicationName: "FanHop",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "FanHop" },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    type: "website",
    siteName: "FanHop",
    title: "FanHop — Soccer 2026 Fan Guide: Cities, Stadiums & Weather",
    description:
      "Host-city guides, match schedules with kickoff-time weather, stadium directions, food and things to do — for fans at the 2026 tournament in the USA, Canada & Mexico.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ServiceWorker />
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0f0d]/70 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
              <span className="text-xl">⚽</span>
              <span className="text-lg">
                Fan<span className="text-emerald-400">Hop</span>
              </span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/today"
                className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 hover:bg-emerald-400/20"
              >
                📅 Today&apos;s matches
              </Link>
              <span className="hidden text-xs text-emerald-300/70 sm:inline">
                USA · Canada · Mexico 2026
              </span>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</main>
        <footer className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/40">
          <p>
            FanHop is an independent fan guide. Not affiliated with, endorsed by, or connected to
            FIFA or the official tournament.
          </p>
        </footer>
      </body>
    </html>
  );
}
