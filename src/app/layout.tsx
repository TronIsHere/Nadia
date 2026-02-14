import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "دکتر نادیا روشنی | دندانپزشک",
  description:
    "مطب دندانپزشکی دکتر نادیا روشنی - فارغ‌التحصیل دانشگاه شهید بهشتی. هماهنگی تلفنی جهت ویزیت و مشاوره رایگان",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
