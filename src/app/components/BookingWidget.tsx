"use client";

import { useState } from "react";
import { DoctorImage } from "./DoctorImage";

type Step = "phone" | "date" | "time" | "confirm" | "success";

// Office hours: Sat/Mon/Wed 4-8pm, Sun/Tue 9am-12pm
// 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
const getSlotsForDay = (dayOfWeek: number): string[] => {
  if ([0, 2].includes(dayOfWeek)) {
    return ["۹:۰۰", "۹:۳۰", "۱۰:۰۰", "۱۰:۳۰", "۱۱:۰۰", "۱۱:۳۰"];
  }
  if ([1, 3, 6].includes(dayOfWeek)) {
    return ["۱۶:۰۰", "۱۶:۳۰", "۱۷:۰۰", "۱۷:۳۰", "۱۸:۰۰", "۱۸:۳۰", "۱۹:۰۰", "۱۹:۳۰"];
  }
  return [];
};

const WEEKDAYS = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];

function getNextDays(count: number): { date: Date; label: string; dayOfWeek: number }[] {
  const result: { date: Date; label: string; dayOfWeek: number }[] = [];
  const toPersianNum = (n: number) => n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)]);
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayOfWeek = d.getDay();
    const slots = getSlotsForDay(dayOfWeek);
    if (slots.length > 0) {
      result.push({
        date: d,
        label: `${WEEKDAYS[dayOfWeek]} ${toPersianNum(d.getDate())}`,
        dayOfWeek,
      });
    }
  }
  return result.slice(0, 14);
}

export function BookingWidget() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState<{ date: Date; label: string; dayOfWeek: number } | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availableDays = getNextDays(21);
  const slots = selectedDate ? getSlotsForDay(selectedDate.dayOfWeek) : [];

  const formatPhone = (v: string) => {
    const n = v.replace(/\D/g, "").slice(0, 11);
    if (n.startsWith("98")) return "۰" + n.slice(2);
    if (n.startsWith("9")) return n;
    return n;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setPhone(formatPhone(raw));
  };

  const toPersianNum = (n: string) =>
    n.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {(["phone", "date", "time", "confirm"] as Step[]).map((s, i) => {
          const idx = ["phone", "date", "time", "confirm"].indexOf(step);
          const done = i < idx;
          const current = i === idx;
          return (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                current ? "w-8 bg-violet-600" : done ? "w-2 bg-violet-500" : "w-2 bg-zinc-600"
              }`}
            />
          );
        })}
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-700/50 overflow-hidden">
        {/* Doctor preview - compact */}
        <div className="p-6 border-b border-zinc-700/50 flex items-center gap-4">
          <DoctorImage size="sm" />
          <div className="min-w-0">
            <p className="font-bold text-zinc-100">دکتر نادیا روشنی</p>
            <p className="text-sm text-zinc-500">دندانپزشک - شهید بهشتی</p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {step === "phone" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-100 mb-1">شماره موبایل</h3>
                <p className="text-sm text-zinc-500 mb-4">
                  برای مشاهده نوبت‌های خالی و دریافت یادآوری پیامکی وارد کنید
                </p>
                <input
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="09123456789"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition text-lg"
                  maxLength={11}
                />
              </div>
              <button
                onClick={() => phone.length >= 10 && setStep("date")}
                disabled={phone.length < 10}
                className="w-full py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                مشاهده نوبت‌های خالی
              </button>
            </div>
          )}

          {step === "date" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-100 mb-1">روز مراجعه</h3>
                <p className="text-sm text-zinc-500 mb-4">یک روز انتخاب کنید</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {availableDays.map((d) => (
                  <button
                    key={d.label}
                    onClick={() => setSelectedDate(d)}
                    className={`p-3 rounded-xl border text-right transition ${
                      selectedDate?.label === d.label
                        ? "border-violet-500 bg-violet-500/20 text-violet-300"
                        : "border-zinc-600 bg-zinc-800/50 hover:border-zinc-500 text-zinc-300"
                    }`}
                  >
                    <span className="text-sm font-medium block">{d.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("phone")}
                  className="px-4 py-2 rounded-lg border border-zinc-600 text-zinc-400 hover:bg-zinc-800"
                >
                  بازگشت
                </button>
                <button
                  onClick={() => selectedDate && setStep("time")}
                  disabled={!selectedDate}
                  className="flex-1 py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  انتخاب زمان
                </button>
              </div>
            </div>
          )}

          {step === "time" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-100 mb-1">ساعت نوبت</h3>
                <p className="text-sm text-zinc-500 mb-4">
                  {selectedDate?.label} — یک زمان انتخاب کنید
                </p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {slots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-3 rounded-xl border font-medium transition ${
                      selectedTime === t
                        ? "border-violet-500 bg-violet-500/20 text-violet-300"
                        : "border-zinc-600 bg-zinc-800/50 hover:border-zinc-500 text-zinc-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("date")}
                  className="px-4 py-2 rounded-lg border border-zinc-600 text-zinc-400 hover:bg-zinc-800"
                >
                  بازگشت
                </button>
                <button
                  onClick={() => selectedTime && setStep("confirm")}
                  disabled={!selectedTime}
                  className="flex-1 py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  تایید و رزرو
                </button>
              </div>
            </div>
          )}

          {step === "confirm" && selectedDate && selectedTime && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-zinc-100">تایید نهایی</h3>
              <div className="bg-zinc-800/50 rounded-xl p-4 space-y-2 border border-zinc-700/50">
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-500">شماره تماس</span>
                  <span dir="ltr">{toPersianNum(phone)}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-500">تاریخ</span>
                  <span>{selectedDate.label}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span className="text-zinc-500">ساعت</span>
                  <span>{selectedTime}</span>
                </div>
              </div>
              <p className="text-sm text-zinc-500 flex items-center gap-2">
                <svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                </svg>
                ۳۰ دقیقه قبل از نوبت، پیامک یادآوری برای شما ارسال می‌شود
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("time")}
                  className="px-4 py-2 rounded-lg border border-zinc-600 text-zinc-400 hover:bg-zinc-800"
                >
                  بازگشت
                </button>
                <button
                  onClick={() => setStep("success")}
                  className="flex-1 py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition"
                >
                  رزرو نوبت
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">نوبت با موفقیت رزرو شد</h3>
              <p className="text-zinc-500 mb-6">
                ۳۰ دقیقه قبل از ساعت {selectedTime} در {selectedDate?.label}، پیامک یادآوری دریافت خواهید کرد
              </p>
              <button
                onClick={() => {
                  setStep("phone");
                  setPhone("");
                  setSelectedDate(null);
                  setSelectedTime(null);
                }}
                className="px-6 py-2 rounded-xl border border-violet-500 text-violet-400 hover:bg-violet-500/10 font-medium transition"
              >
                رزرو نوبت جدید
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
