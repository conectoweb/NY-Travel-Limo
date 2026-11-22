import type { Metadata } from "next";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import { isPublicSiteRequest, siteUrl } from "@/lib/seo";
import { organizationSchema } from "@/lib/schema";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const isPublicSite = await isPublicSiteRequest();
  const metadataBase = new URL("https://www.nytravellimo.com");

  return {
    metadataBase,
    robots: isPublicSite
      ? { index: true, follow: true }
      : {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Google Tag Manager (noscript) — must be immediately after <body> opens */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P9P2ND9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <a
          href="#main-content"
          className="sr-only z-[100] rounded bg-white px-4 py-3 font-semibold text-stone-950 shadow focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-[#dcbb5c]"
        >
          Skip to main content
        </a>
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
