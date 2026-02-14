"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      {/* Desktop sidebar - hidden on mobile */}
      <aside className="hidden md:flex w-64 border-l border-zinc-800 flex-col flex-shrink-0">
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

      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950 sticky top-0 z-40">
        <Link href="/panel" className="text-base font-bold text-violet-400">
          پنل پذیرش
        </Link>
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-300 transition flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          سایت
        </Link>
      </header>

      {/* Main content - pb-20 on mobile for bottom nav */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around items-center py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] z-40">
        <Link
          href="/panel"
          className={`flex flex-col items-center gap-1 py-2 px-4 min-w-[4rem] rounded-lg transition ${
            pathname === "/panel" ? "text-violet-400" : "text-zinc-500"
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs">نوبت‌ها</span>
        </Link>
        <Link
          href="/"
          className="flex flex-col items-center gap-1 py-2 px-4 min-w-[4rem] rounded-lg text-zinc-500 transition active:bg-zinc-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs">سایت</span>
        </Link>
      </nav>
    </div>
  );
}
