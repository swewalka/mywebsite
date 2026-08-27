import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { portfolio } from "@/config/portfolio";
import { withBasePath } from "@/config/paths";
import { siteUrl } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: portfolio.metadata.title,
  description: portfolio.metadata.description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: portfolio.metadata.title,
    description: portfolio.metadata.description,
    url: "/",
    siteName: portfolio.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: withBasePath("/assets/optimized/launch-rocket.webp"),
        width: 720,
        height: 720,
        alt: "Handcrafted paper rocket",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.metadata.title,
    description: portfolio.metadata.description,
    images: [withBasePath("/assets/optimized/launch-rocket.webp")],
  },
  icons: {
    icon: withBasePath("/favicon.svg"),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060a12",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
