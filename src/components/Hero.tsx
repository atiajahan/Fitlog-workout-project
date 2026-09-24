"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-[#12151a] border border-gray-800/80 rounded-2xl p-6 sm:p-10 md:p-12 lg:p-14 mb-8 md:mb-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8 sm:gap-10">
      {/* Left Content */}
      <div className="w-full md:w-3/5 space-y-4 text-left">
        {/* Top Tagline */}
        <span className="text-[#ccff00] text-xs sm:text-sm font-bold uppercase tracking-widest block">
          WORKOUT LIBRARY
        </span>

        {/* Heading */}
        <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1]">
          TRAIN WITH INTENT. <br />
          <span className="text-[#ccff00]">LOG EVERY SET.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl font-medium">
          Build strength, track your progress, and stay consistent with a workout library designed to keep you moving forward.
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold px-6 py-3.5 rounded-full text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-[#ccff00]/20"
          >
            BROWSE WORKOUTS ↓
          </a>
        </div>
      </div>

      {/* Right Banner Image */}
      <div className="relative w-full md:w-2/5 h-64 sm:h-80 lg:h-[360px] flex justify-center items-center">
        <Image
          src="/banner.png"
          alt="FitLog Hero Banner"
          fill
          className="object-contain object-center"
          priority
        />
      </div>
    </section>
  );
}