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
        <link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/styles/webawesome.css" />
        <link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/styles/themes/active.css" />
        <link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/styles/themes/awesome/color.css" />
        <link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/styles/color/bright.css" />
        <link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/styles/themes/playful/typography.css" />
        <Script type="module" crossOrigin='anonymous' src="https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/webawesome.loader.js" />
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
