"use client";

import { useState } from "react";

type Appointment = {
  id: string;
  phone: string;
  date: string;
  time: string;
  status: "confirmed" | "cancelled" | "completed";
  createdAt: string;
};

const toPersianNum = (n: string) =>
  n.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)]);

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "1", phone: "09123456789", date: "یکشنبه ۱۵", time: "۹:۳۰", status: "confirmed", createdAt: "امروز" },
  { id: "2", phone: "09121234567", date: "یکشنبه ۱۵", time: "۱۰:۰۰", status: "confirmed", createdAt: "امروز" },
  { id: "3", phone: "09359876543", date: "دوشنبه ۱۶", time: "۱۶:۳۰", status: "confirmed", createdAt: "دیروز" },
  { id: "4", phone: "09131112233", date: "دوشنبه ۱۶", time: "۱۷:۰۰", status: "cancelled", createdAt: "دیروز" },
  { id: "5", phone: "09198765432", date: "سه‌شنبه ۱۷", time: "۱۰:۰۰", status: "confirmed", createdAt: "۲ روز قبل" },
];

export default function PanelPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
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
    if (!newPhone || !newDate || !newTime) return;
    setAppointments((prev) => [
      {
        id: Date.now().toString(),
        phone: newPhone,
        date: newDate,
        time: newTime,
        status: "confirmed",
        createdAt: "الان",
      },
      ...prev,
    ]);
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
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">مدیریت نوبت‌ها</h1>
          <p className="text-zinc-500 mt-1">مشاهده و مدیریت نوبت‌های مطب</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          افزودن نوبت
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
          <p className="text-zinc-500 text-sm">نوبت‌های تایید شده</p>
          <p className="text-2xl font-bold text-violet-400 mt-1">{stats.total}</p>
        </div>
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
          <p className="text-zinc-500 text-sm">امروز</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.today}</p>
        </div>
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
          <p className="text-zinc-500 text-sm">لغو شده</p>
          <p className="text-2xl font-bold text-zinc-500 mt-1">{stats.cancelled}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setDateFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            dateFilter === "all"
              ? "bg-violet-600 text-white"
              : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
          }`}
        >
          همه
        </button>
        {dates.map((d) => (
          <button
            key={d}
            onClick={() => setDateFilter(d)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              dateFilter === d
                ? "bg-violet-600 text-white"
                : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Appointments table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
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
                  <td className="py-4 px-6 font-medium" dir="ltr">
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
        {filteredAppointments.length === 0 && (
          <div className="py-16 text-center text-zinc-500">
            نوبتی یافت نشد
          </div>
        )}
      </div>

      {/* Add appointment modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-700 w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-zinc-100 mb-4">افزودن نوبت جدید</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-500 mb-1">شماره موبایل</label>
                <input
                  type="tel"
                  dir="ltr"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="09123456789"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-500 focus:border-violet-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-1">تاریخ (مثال: یکشنبه ۱۵)</label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="یکشنبه ۱۵"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-500 focus:border-violet-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-1">ساعت (مثال: ۹:۳۰)</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  placeholder="۹:۳۰"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-500 focus:border-violet-500 outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 rounded-lg border border-zinc-600 text-zinc-400 hover:bg-zinc-800 transition"
              >
                انصراف
              </button>
              <button
                onClick={handleAdd}
                disabled={!newPhone || !newDate || !newTime}
                className="flex-1 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
