import Link from "next/link";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      {/* Sidebar */}
      <aside className="w-64 border-l border-zinc-800 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-zinc-800">
          <Link href="/panel" className="text-lg font-bold text-violet-400">
            پنل پذیرش
          </Link>
          <p className="text-xs text-zinc-500 mt-1">دکتر نادیا روشنی</p>
        </div>
        <nav className="p-4 flex-1">
          <Link
            href="/panel"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            نوبت‌ها
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300 transition mt-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            بازگشت به سایت
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
