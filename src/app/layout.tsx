export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import "./globals.css";
import prisma from "@/lib/prisma";

import { Viewport } from "next";

export const metadata: Metadata = {
  title: "أكاديمية همة الفرسان الرياضية | بالهمة تتحقق الأحلام",
  description: "أكاديمية همة الفرسان لكرة القدم في مكة المكرمة — تدريب الفئات السنية من 6 إلى 18 سنة في فرعي النزهة والبحيرات. 20 لاعباً انتقلوا للأندية. تواصل معنا الآن.",
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ContactBarWrapper from "@/components/ContactBarWrapper";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const branches = await prisma.branch.findMany({
    select: { id: true, name: true, phone: true, phoneIntl: true, whatsapp: true, waMessage: true, slug: true }
  });

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
        <link rel="preload" href="/assets/fonts/Changa.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/Plex-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        {children}
        <ContactBarWrapper branches={branches} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
