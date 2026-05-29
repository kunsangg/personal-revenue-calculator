import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProfitOS — Ecommerce Profitability Dashboard for Indian Sellers",
  description:
    "Advanced profitability calculator for ecommerce, dropshipping & D2C. RTO, GST, ads, shipping & scaling — built for Indian sellers.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://personal-revenue-calculator.vercel.app"
  ),
  openGraph: {
    title: "ProfitOS",
    description: "Ecommerce profitability dashboard for Indian sellers",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ProfitOS",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen min-h-[100dvh] bg-zinc-950 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
