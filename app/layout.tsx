import type { Metadata } from "next";
import CookieConsent from "@/components/CookieConsent";
import { isPublicSiteRequest, siteUrl } from "@/lib/seo";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const isPublicSite = await isPublicSiteRequest();

  return {
    metadataBase: new URL(siteUrl),
    robots: isPublicSite
      ? { index: true, follow: true }
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isPublicSite = await isPublicSiteRequest();

  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
