"use client";

import { useState } from "react";

type Appointment = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  date: string;
  time: string;
  status: "confirmed" | "cancelled" | "completed";
  createdAt: string;
};

const toPersianNum = (n: string) =>
  n.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)]);

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "1", firstName: "علی", lastName: "محمدی", phone: "09123456789", date: "یکشنبه ۱۵", time: "۹:۳۰", status: "confirmed", createdAt: "امروز" },
  { id: "2", firstName: "مریم", lastName: "احمدی", phone: "09121234567", date: "یکشنبه ۱۵", time: "۱۰:۰۰", status: "confirmed", createdAt: "امروز" },
  { id: "3", firstName: "رضا", lastName: "کریمی", phone: "09359876543", date: "دوشنبه ۱۶", time: "۱۶:۳۰", status: "confirmed", createdAt: "دیروز" },
  { id: "4", firstName: "سارا", lastName: "حسینی", phone: "09131112233", date: "دوشنبه ۱۶", time: "۱۷:۰۰", status: "cancelled", createdAt: "دیروز" },
  { id: "5", firstName: "امیر", lastName: "رضایی", phone: "09198765432", date: "سه‌شنبه ۱۷", time: "۱۰:۰۰", status: "confirmed", createdAt: "۲ روز قبل" },
];

export default function PanelPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const filteredAppointments = appointments.filter((a) => {
    if (dateFilter === "all") return true;
    return a.date === dateFilter;
  });

  const dates = [...new Set(appointments.map((a) => a.date))];

  const handleCancel = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" as const } : a))
    );
  };

  const handleAdd = () => {
    if (!newFirstName.trim() || !newLastName.trim() || !newPhone || !newDate || !newTime) return;
    setAppointments((prev) => [
      {
        id: Date.now().toString(),
        firstName: newFirstName.trim(),
        lastName: newLastName.trim(),
        phone: newPhone,
        date: newDate,
        time: newTime,
        status: "confirmed",
        createdAt: "الان",
      },
      ...prev,
    ]);
    setNewFirstName("");
    setNewLastName("");
    setNewPhone("");
    setNewDate("");
    setNewTime("");
    setShowAddModal(false);
  };

  const stats = {
    total: appointments.filter((a) => a.status === "confirmed").length,
    today: appointments.filter((a) => a.date.includes("۱۵") && a.status === "confirmed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-100">مدیریت نوبت‌ها</h1>
            <p className="text-zinc-500 text-sm mt-0.5">مشاهده و مدیریت نوبت‌های مطب</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] text-white font-medium transition touch-manipulation min-h-[44px]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            افزودن نوبت
          </button>
        </div>
      </div>

      {/* Stats - compact grid on mobile */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 sm:p-4">
          <p className="text-zinc-500 text-xs sm:text-sm">تایید شده</p>
          <p className="text-lg sm:text-2xl font-bold text-violet-400 mt-0.5 sm:mt-1">{stats.total}</p>
        </div>
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 sm:p-4">
          <p className="text-zinc-500 text-xs sm:text-sm">امروز</p>
          <p className="text-lg sm:text-2xl font-bold text-emerald-400 mt-0.5 sm:mt-1">{stats.today}</p>
        </div>
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 sm:p-4">
          <p className="text-zinc-500 text-xs sm:text-sm">لغو شده</p>
          <p className="text-lg sm:text-2xl font-bold text-zinc-500 mt-0.5 sm:mt-1">{stats.cancelled}</p>
        </div>
      </div>

      {/* Filters - horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible mb-6">
        <button
          onClick={() => setDateFilter("all")}
          className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition touch-manipulation min-h-[44px] ${
            dateFilter === "all"
              ? "bg-violet-600 text-white"
              : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 active:bg-zinc-700"
          }`}
        >
          همه
        </button>
        {dates.map((d) => (
          <button
            key={d}
            onClick={() => setDateFilter(d)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition touch-manipulation min-h-[44px] ${
              dateFilter === d
                ? "bg-violet-600 text-white"
                : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 active:bg-zinc-700"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Appointments - cards on mobile, table on desktop */}
      <div className="space-y-3 sm:space-y-0">
        {/* Mobile: card list */}
        <div className="sm:hidden space-y-3">
          {filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-zinc-100">
                    {apt.firstName} {apt.lastName}
                  </p>
                  <p className="text-sm text-zinc-500" dir="ltr">
                    {toPersianNum(apt.phone)}
                  </p>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    {apt.date} • {apt.time}
                  </p>
                </div>
                <span
                  className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium ${
                    apt.status === "confirmed"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : apt.status === "cancelled"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-zinc-500/20 text-zinc-400"
                  }`}
                >
                  {apt.status === "confirmed" ? "تایید" : apt.status === "cancelled" ? "لغو" : "انجام"}
                </span>
              </div>
              {apt.status === "confirmed" && (
                <button
                  onClick={() => handleCancel(apt.id)}
                  className="w-full py-2.5 rounded-lg border border-red-500/50 text-red-400 text-sm font-medium active:bg-red-500/10 touch-manipulation"
                >
                  لغو نوبت
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden sm:block bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-right py-4 px-6 text-zinc-500 font-medium">نام بیمار</th>
                  <th className="text-right py-4 px-6 text-zinc-500 font-medium">شماره تماس</th>
                  <th className="text-right py-4 px-6 text-zinc-500 font-medium">تاریخ</th>
                  <th className="text-right py-4 px-6 text-zinc-500 font-medium">ساعت</th>
                  <th className="text-right py-4 px-6 text-zinc-500 font-medium">وضعیت</th>
                  <th className="text-right py-4 px-6 text-zinc-500 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">
                    <td className="py-4 px-6 font-medium text-zinc-100">
                      {apt.firstName} {apt.lastName}
                    </td>
                    <td className="py-4 px-6" dir="ltr">
                      {toPersianNum(apt.phone)}
                    </td>
                    <td className="py-4 px-6 text-zinc-300">{apt.date}</td>
                    <td className="py-4 px-6 text-zinc-300">{apt.time}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${
                          apt.status === "confirmed"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : apt.status === "cancelled"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-zinc-500/20 text-zinc-400"
                        }`}
                      >
                        {apt.status === "confirmed" ? "تایید شده" : apt.status === "cancelled" ? "لغو شده" : "انجام شده"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {apt.status === "confirmed" && (
                        <button
                          onClick={() => handleCancel(apt.id)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium transition"
                        >
                          لغو نوبت
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {filteredAppointments.length === 0 && (
        <div className="py-12 sm:py-16 text-center text-zinc-500 text-sm">
          نوبتی یافت نشد
        </div>
      )}

      {/* Add appointment modal - full screen on mobile */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-zinc-900 rounded-t-2xl sm:rounded-2xl border border-zinc-700 w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 px-4 py-4 sm:p-6 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-100">افزودن نوبت جدید</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 -m-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition touch-manipulation"
                aria-label="بستن"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-zinc-500 mb-1.5">نام</label>
                  <input
                    type="text"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    placeholder="نام"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-500 focus:border-violet-500 outline-none text-base touch-manipulation"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-500 mb-1.5">نام خانوادگی</label>
                  <input
                    type="text"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    placeholder="نام خانوادگی"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-500 focus:border-violet-500 outline-none text-base touch-manipulation"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-1.5">شماره موبایل</label>
                <input
                  type="tel"
                  dir="ltr"
                  inputMode="numeric"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="09123456789"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-500 focus:border-violet-500 outline-none text-base touch-manipulation"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-1.5">تاریخ (مثال: یکشنبه ۱۵)</label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="یکشنبه ۱۵"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-500 focus:border-violet-500 outline-none text-base touch-manipulation"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-1.5">ساعت (مثال: ۹:۳۰)</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  placeholder="۹:۳۰"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-500 focus:border-violet-500 outline-none text-base touch-manipulation"
                />
              </div>
            </div>
            <div className="p-4 sm:p-6 pt-0 flex gap-3 sticky bottom-0 bg-zinc-900 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 rounded-xl border border-zinc-600 text-zinc-400 hover:bg-zinc-800 active:bg-zinc-700 transition touch-manipulation min-h-[48px]"
              >
                انصراف
              </button>
              <button
                onClick={handleAdd}
                disabled={!newFirstName.trim() || !newLastName.trim() || !newPhone || !newDate || !newTime}
                className="flex-1 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-500 active:bg-violet-400 disabled:opacity-50 disabled:cursor-not-allowed transition touch-manipulation min-h-[48px]"
              >
                ثبت نوبت
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
