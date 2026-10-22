import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUXEPHINE — Precious Jewelry Since 1928",
  description:
    "Discover the unparalleled craftsmanship of LUXEPHINE. Exquisite high-end jewelry collections crafted for those who seek timeless elegance and refined luxury.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
