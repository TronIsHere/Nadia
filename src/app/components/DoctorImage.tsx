"use client";

import Image from "next/image";
import { useState } from "react";

type DoctorImageProps = {
  size?: "sm" | "lg";
};

export function DoctorImage({ size = "lg" }: DoctorImageProps) {
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  const isSm = size === "sm";
  const sizeClass = isSm ? "w-16 h-16 rounded-xl" : "w-64 h-64 md:w-80 md:h-80 rounded-2xl";

  if (usePlaceholder) {
    return (
      <div className={`relative ${sizeClass} overflow-hidden shadow-xl ring-2 ring-zinc-600 flex-shrink-0 bg-zinc-800 flex items-center justify-center`}>
        <svg
          className={isSm ? "w-8 h-8 text-zinc-500" : "w-24 h-24 text-zinc-500"}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        {!isSm && (
          <span className="absolute bottom-4 text-zinc-500 text-sm">عکس دکتر</span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClass} overflow-hidden shadow-xl ring-2 ring-zinc-600 flex-shrink-0`}>
      <Image
        src="/doctor.jpg"
        alt="دکتر نادیا روشنی"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 256px, 320px"
        priority
        onError={() => setUsePlaceholder(true)}
      />
    </div>
  );
}
