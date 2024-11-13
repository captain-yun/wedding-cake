import { Inter } from "next/font/google";
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Creative Digital Agency",
  description: "당신의 브랜드를 위한 최고의 솔루션",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <Link href="/admin/editor" className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded">
          관리자 페이지
        </Link>
      </body>
    </html>
  );
}
