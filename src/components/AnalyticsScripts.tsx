"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { trackPageView } from "@/lib/analytics";

export default function AnalyticsScripts() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
  const snapPixelId = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;

  // Track page views on route change
  useEffect(() => {
    if (pathname) {
      // You can append searchParams if you want tracking URLs to include query params:
      // const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
      trackPageView(pathname);
    }
  }, [pathname, searchParams]);

  return (
    <>
      {/* Meta (Facebook) Pixel */}
      {fbPixelId && (
        <>
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${fbPixelId}');
              `,
            }}
          />
        </>
      )}

      {/* Google Analytics */}
      {googleTagId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleTagId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Snapchat Pixel */}
      {snapPixelId && (
        <>
          <Script
            id="snap-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
                {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
                a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
                r.src=n;var u=t.getElementsByTagName(s)[0];
                u.parentNode.insertBefore(r,u);})(window,document,
                'https://sc-static.net/scevent.min.js');

                snaptr('init', '${snapPixelId}');
              `,
            }}
          />
        </>
      )}
    </>
  );
}
