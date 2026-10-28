import type { Metadata } from "next";
import Script from "next/script";
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
        {/* Google Tag Manager (noscript) — must be immediately after <body> opens */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P9P2ND9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Google Tag Manager — loaded once here so it runs on every page */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P9P2ND9');`}
        </Script>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
