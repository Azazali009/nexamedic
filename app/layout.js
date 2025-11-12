// import "lenis/dist/lenis.css";
import Script from "next/script";
import Footer from "./_components/Footer";
import GoogleAnalytics from "./_components/GoogleAnalytics";
import Header from "./_components/Header";
// import LenisProvider from "./_components/LenisProvider";
import ScrollToTop from "./_components/ScrollToTop";
import { inter } from "./_lib/font";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Nexamedic |",
  description: "This site is under construction",
  other: {
    "google-site-verification": "NHfJkN22bU3vSEE35df8ql_4wrHDVy76zrjk_FEpKbM",
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
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L7NG82T2T9"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L7NG82T2T9');
          `}
        </Script>
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
