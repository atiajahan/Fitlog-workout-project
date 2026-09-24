"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import PlanMetrics from "@/components/PlanMetrics";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import { useFitLog } from "@/context/FitLogContext";

export default function MyPlanPage() {
  const { plan, saved } = useFitLog();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const [sortBy, setSortBy] = useState<
    "duration" | "caloriesBurned" | "rating"
  >("duration");

  const rawWorkouts = activeTab === "plan" ? plan : saved;

  const workouts = [...rawWorkouts].sort(
    (a, b) => b[sortBy] - a[sortBy]
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* ================= HEADER ================= */}
      <section className="mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
          MY PLAN
        </h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </section>

      {/* ================= METRICS ================= */}
      <section className="mb-8">
        <PlanMetrics />
      </section>

      {/* ================= TABS + SORT ================= */}
      <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}
        <div className="inline-flex w-fit items-center rounded-xl border border-white/10 bg-[#0d1014] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
              activeTab === "plan"
                ? "bg-white/[0.08] text-white shadow-sm"
                : "bg-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
              activeTab === "saved"
                ? "bg-white/[0.08] text-white shadow-sm"
                : "bg-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            Sort By
          </span>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | "duration"
                    | "caloriesBurned"
                    | "rating"
                )
              }
              className="appearance-none rounded-xl border border-white/10 bg-[#0d1014] py-2.5 pl-4 pr-10 text-xs font-semibold text-gray-300 outline-none transition hover:border-white/20 focus:border-[#ccff00]/50"
            >
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
      </section>

      {/* ================= DIVIDER ================= */}
      <div className="mb-6 h-px w-full bg-white/[0.06]" />

      {/* ================= CONTENT ================= */}
      <section>
        {workouts.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-[#0d1014] px-5 py-16 text-center">
            <h2 className="text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
              NOTHING HERE YET
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-7 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:bg-[#b8e600] hover:scale-[1.02]"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {workouts.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                type={activeTab}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}