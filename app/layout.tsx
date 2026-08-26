import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { portfolio } from "@/config/portfolio";
import { withBasePath } from "@/config/paths";
import "./globals.css";

export const metadata: Metadata = {
  title: portfolio.metadata.title,
  description: portfolio.metadata.description,
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: portfolio.metadata.title,
    description: portfolio.metadata.description,
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
