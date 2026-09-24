"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  return (
    <header className="w-full border-b border-gray-800/80 bg-[#0c0e12] py-4">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Dumbbell className="h-6 w-6 text-[#baff00] group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-black uppercase tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-1.5 rounded-full bg-[#15181e] p-1.5 border border-gray-800">
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-sm font-bold uppercase transition-all ${
              pathname === "/"
                ? "bg-[#baff00] text-black shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/plan"
            className={`rounded-full px-5 py-2 text-sm font-bold uppercase transition-all ${
              pathname === "/plan"
                ? "bg-[#baff00] text-black shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Counters */}
        <div className="flex items-center gap-4 text-sm font-extrabold uppercase">
          <div className="flex items-center gap-2 text-gray-300">
            <span>Plan</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#baff00] text-xs text-black font-black">
              {plan.length}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <span>Saved</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1f242d] text-xs text-white border border-gray-700">
              {saved.length}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}