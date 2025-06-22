import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./lib/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FETCHING SHOP",
  description: "다양한 상품을 검색하고 구매할 수 있는 온라인 쇼핑몰입니다.",
  keywords: ["쇼핑", "상품", "검색", "온라인쇼핑", "전자제품", "의류"],
  publisher: "Fetching",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://your-domain.com",
    title: "상품 검색 및 쇼핑몰",
    description: "다양한 상품을 검색하고 구매할 수 있는 온라인 쇼핑몰입니다.",
    siteName: "상품 검색 및 쇼핑몰",
    images: [
      {
        url: "/og-image.png",
        width: 600,
        height: 300,
        alt: "상품 검색 및 쇼핑몰",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "상품 검색 및 쇼핑몰",
  //   description: "다양한 상품을 검색하고 구매할 수 있는 온라인 쇼핑몰입니다.",
  //   images: ["/og-image.png"],
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
