'use client';

import { Inter } from "next/font/google";
import { useEffect } from 'react';
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import useAuthStore from '@/store/auth';
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

// export const viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
// };

// export const metadata = {
//   title: "Creative Digital Agency",
//   description: "당신의 브랜드를 위한 최고의 솔루션",
//   charset: "utf-8",
// };

export default function RootLayout({ children }) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
