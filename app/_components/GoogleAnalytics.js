"use client";
import Script from "next/script";

//react/no-unescaped-entities: `'` can be escaped with &apos;

export default function GoogleAnalytics() {
  return (
    <>
      {/* Load GA library first */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-S5ECX5RQJ0"
      />

      {/* Initialize GA safely on client side */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S5ECX5RQJ0');
        `}
      </Script>
    </>
  );
}
