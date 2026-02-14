import { DoctorImage } from "./components/DoctorImage";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/50 to-white">
      {/* Header */}
      <header className="border-b border-teal-100/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <h1 className="text-xl font-bold text-teal-900">
            مطب دندانپزشکی دکتر نادیا روشنی
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row gap-10 items-center mb-16">
          <DoctorImage />
          <div className="flex-1 text-center md:text-right">
            <h2 className="text-2xl md:text-3xl font-bold text-teal-900 mb-2">
              دکتر نادیا روشنی
            </h2>
            <p className="text-teal-700 mb-4">
              فارغ‌التحصیل دانشگاه شهید بهشتی در سال ۱۳۸۱
            </p>
            <p className="text-gray-600 leading-relaxed">
              با سال‌ها تجربه در زمینه دندانپزشکی، آماده ارائه خدمات با کیفیت و
              مشاوره رایگان به شما عزیزان هستم.
            </p>
          </div>
        </section>

        {/* Office Hours */}
        <section className="mb-16">
          <h3 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
            ساعات کاری مطب
          </h3>
          <div className="bg-white rounded-2xl shadow-lg border border-teal-50 overflow-hidden">
            <div className="divide-y divide-teal-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-5 hover:bg-teal-50/30 transition-colors">
                <span className="font-medium text-gray-700">
                  شنبه، دوشنبه، چهارشنبه
                </span>
                <span className="text-teal-700 font-semibold">
                  ۴ بعدازظهر تا ۸ شب
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-5 hover:bg-teal-50/30 transition-colors">
                <span className="font-medium text-gray-700">
                  یکشنبه، سه‌شنبه
                </span>
                <span className="text-teal-700 font-semibold">
                  ۹ صبح تا ۱۲ ظهر
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Appointment CTA */}
        <section className="mb-16">
          <h3 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
            هماهنگی نوبت
          </h3>
          <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-8 md:p-10 text-white shadow-xl">
            <p className="text-lg md:text-xl font-medium mb-4 text-teal-50">
              هماهنگی تلفنی جهت ویزیت و مشاوره رایگان
            </p>
            <p className="text-teal-100 mb-6">
              همه روزه صبح و عصر
            </p>
            <a
              href="tel:"
              className="inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-xl font-bold hover:bg-teal-50 transition-colors shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              تماس برای نوبت‌گیری
            </a>
            <p className="mt-4 text-sm text-teal-200">
              لطفاً شماره تلفن مطب را در این بخش قرار دهید
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-teal-100 pt-8 text-center text-gray-500 text-sm">
          <p>مطب دندانپزشکی دکتر نادیا روشنی</p>
          <p className="mt-1">فارغ‌التحصیل دانشگاه شهید بهشتی</p>
        </footer>
      </main>
    </div>
  );
}
