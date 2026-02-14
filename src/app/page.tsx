import { BookingWidget } from "./components/BookingWidget";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f14]">
      {/* Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-zinc-100">
            نوبت آنلاین | دکتر نادیا روشنی
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              در دسترس
            </div>
            <Link
              href="/panel"
              className="text-sm text-zinc-400 hover:text-violet-400 transition"
            >
              پنل پذیرش
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="pt-12 pb-16 px-6">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <p className="text-violet-400 font-semibold mb-2">
              مطب دندانپزشکی دکتر نادیا روشنی
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 leading-tight mb-4">
              نوبت بگیرید، یادآوری دریافت کنید
            </h2>
            <p className="text-lg text-zinc-400">
              شماره خود را وارد کنید، زمان خالی را انتخاب کنید و ۳۰ دقیقه قبل از نوبت پیامک یادآوری بگیرید
            </p>
          </div>

          {/* Features - horizontal pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: "📱", label: "شماره موبایل" },
              { icon: "📅", label: "زمان خالی" },
              { icon: "✅", label: "رزرو نوبت" },
              { icon: "💬", label: "پیامک ۳۰ دقیقه قبل" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/60 border border-zinc-700/50 text-sm font-medium text-zinc-300"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {i < 3 && (
                  <svg className="w-4 h-4 text-zinc-500 hidden sm:block" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Booking Widget */}
          <BookingWidget />
        </section>

        {/* Trust / Info strip */}
        <section className="border-t border-zinc-800 bg-zinc-900/30 py-8">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-2xl font-bold text-violet-400 mb-1">دکتر نادیا روشنی</p>
                <p className="text-sm text-zinc-500">فارغ‌التحصیل دانشگاه شهید بهشتی ۱۳۸۱</p>
              </div>
              <div>
                <p className="text-zinc-300 font-medium mb-1">ساعات مطب</p>
                <p className="text-sm text-zinc-500">
                  شنبه، دوشنبه، چهارشنبه: ۴–۸ عصر<br />
                  یکشنبه، سه‌شنبه: ۹ صبح–۱۲ ظهر
                </p>
              </div>
              <div>
                <p className="text-zinc-300 font-medium mb-1">مشاوره رایگان</p>
                <p className="text-sm text-zinc-500">هماهنگی تلفنی همه روزه</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 py-6 text-center text-zinc-500 text-sm">
        <p>مطب دندانپزشکی دکتر نادیا روشنی</p>
      </footer>
    </div>
  );
}
