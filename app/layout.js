// import "lenis/dist/lenis.css";
import Script from "next/script";
import Footer from "./_components/Footer";
import GoogleAnalytics from "./_components/GoogleAnalytics";
import Header from "./_components/Header";
// import LenisProvider from "./_components/LenisProvider";
import { inter } from "./_lib/font";
import "./globals.css";
import Providers from "./providers";
import { Scroll } from "@react-three/drei";
import ScrollToTop from "./_components/ScrollToTop";

export const metadata = {
  title: "Nexamedic |",
  description: "This site is under construction",
  other: {
    "google-site-verification": "XE0zg03LiBExpX3qPs2hB4wj6JQu-_TJwiQLERkp3xc",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <head>
        {/* Microsoft Clarity Script */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "txsxjf0f4g");
            `,
          }}
        />
      </head>
      {/* <LenisProvider> */}
      <body
        className={`${inter.className} bg-background text-darkblue relative overflow-x-hidden antialiased`}
      >
        <GoogleAnalytics />
        <ScrollToTop />
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
