"use client"

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

import { app_mobile_breakpoint, isDebug } from '@/lib/constants';

import "./globals.css";

const getBrowserTheme = () => {
  try {
    const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    return mql && mql.matches ? 'dark' : 'light';
  } catch { }

  return "dark"
};

export default function RootLayout({
  children,
}) {
  return (
    <html suppressHydrationWarning lang="en" className={ `wa-${getBrowserTheme()}` }>
      <head>
        <Script src="https://kit.webawesome.com/1b89132143c1414e.js" crossorigin="anonymous"></Script>
        <Script type="text/javascript" src="https://upload-widget.cloudinary.com/latest/global/all.js" />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <wa-page mobile-breakpoint={ app_mobile_breakpoint }>
          { children }
        </wa-page>
        {
          !isDebug && <>
            <Analytics />
            <SpeedInsights />
          </>
        }
      </body>
    </html>
  );
}
