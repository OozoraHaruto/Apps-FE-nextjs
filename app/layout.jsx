import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"

import { app_mobile_breakpoint } from '@/lib/constants';
import "./globals.css";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.11/dist/styles/webawesome.css" />
        <link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.11/dist/styles/themes/active.css" />
        <link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.11/dist/styles/themes/awesome/color.css" />
        <link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.11/dist/styles/color/bright.css" />
        <link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.11/dist/styles/themes/playful/typography.css" />
        <Script type="module" crossOrigin='anonymous' src="https://early.webawesome.com/webawesome@3.0.0-alpha.11/dist/webawesome.loader.js" />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <wa-page mobile-breakpoint={ app_mobile_breakpoint }>
          { children }
        </wa-page>
        <Analytics />
      </body>
    </html>
  );
}
