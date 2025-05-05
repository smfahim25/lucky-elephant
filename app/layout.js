// app/layout.js

/* eslint-disable @next/next/no-page-custom-font */
import React from "react";
import "@/src/assets/css/animate.css";
import "@/src/assets/css/bootstrap.min.css";
import "@/src/assets/css/slick-theme.min.css";
import "@/src/assets/css/slick.min.css";
import "@/src/assets/css/calender.css";
import "@/src/assets/css/magnific-popup.css";
import "@/src/assets/css/off-canvas.css";
import "@/src/assets/css/owl.carousel.css";
import "@/src/assets/css/responsive.css";
import "@/src/assets/css/sc-spacing.css";
import "@/src/assets/css/scmenu-main.css";
import GlobalStyles from "@/src/assets/styles/GlobalStyles";
import "./globals.css";

import { headers } from "next/headers";
import Providers from "@/src/common/Providers";
import ConnectWallet from "@/src/common/ConnectWallet"; // ✅ Added Global Wallet Component
import GlobalStyleTwo from "@/src/assets/styles/GlobalStyleTwo";

export const metadata = {
  title: "Lucky Elephant Club | NFT Minting, DAO Governance, & Rewards",
  description:
    "Join Lucky Elephant Club, an exclusive NFT DApp with DAO governance. Mint NFTs, participate in governance, and earn rewards on the Ethereum Mainnet",
};

export default async function RootLayout({ children }) {
  // 1) Access request headers in Next.js for SSR
  const headersObj = await headers();
  const cookieString = headersObj.get("cookie") || "";
  const pathname = headersObj.get("x-next-pathname") || "";

  const referer = headersObj.get("referer") || "";
  const url = new URL(referer || "http://localhost");
  const isStakeRoute = url.pathname.startsWith("/stake");

  return (
    <html lang="en">
      <head>
        {/* Preconnect and Font Links */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bakbak+One&family=Sedgwick+Ave+Display&family=Inter:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lalezar&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>

      <body>
        {!isStakeRoute ? <GlobalStyles /> : <GlobalStyleTwo />}
        <Providers cookies={cookieString}>
          <ConnectWallet /> {/* ✅ Now available across ALL pages */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
