import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "نوبت آنلاین | دکتر نادیا روشنی دندانپزشک",
  description:
    "رزرو آنلاین نوبت دندانپزشکی - دکتر نادیا روشنی. مشاهده زمان‌های خالی، رزرو نوبت و دریافت پیامک یادآوری ۳۰ دقیقه قبل از مراجعه",
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
