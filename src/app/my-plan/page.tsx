"use client";

import { useState } from "react";
import Link from "next/link";
import PlanMetrics from "@/components/PlanMetrics";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import { useFitLog } from "@/context/FitLogContext";

export default function MyPlanPage() {
  const { plan, saved } = useFitLog();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "caloriesBurned" | "rating">("duration");

  const rawWorkouts = activeTab === "plan" ? plan : saved;

  const workouts = [...rawWorkouts].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <main className="w-full max-w-7xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-wide">
          MY PLAN
        </h1>
        <p className="mt-1.5 text-xs text-gray-400 font-medium">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Banner */}
      <PlanMetrics />

      {/* Filter Tabs & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-4">
        {/* Toggle Buttons */}
        <div className="flex rounded-xl bg-[#12151a] p-1 border border-gray-800/80">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "plan"
                ? "bg-[#252932] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "saved"
                ? "bg-[#252932] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400 font-medium">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#12151a] border border-gray-800 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#ccff00]"
          >
            <option value="duration">Duration</option>
            <option value="caloriesBurned">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {workouts.length === 0 ? (
          /* Empty State Box matching Figma design */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800/80 bg-[#12151a] py-24 text-center px-4">
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
              NOTHING HERE YET
            </h2>

            <p className="mt-2 text-xs text-gray-400 font-medium">
              Browse the library and add a lift to get today moving.
            </p>

            {/* Go to workouts Button */}
            <Link
              href="/"
              className="mt-6 rounded-full bg-[#ccff00] px-6 py-2.5 text-xs font-black text-black hover:bg-[#b8e600] transition-all shadow-md"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          workouts.map((workout) => (
            <PlanWorkoutCard
              key={workout.id}
              workout={workout}
              type={activeTab}
            />
          ))
        )}
      </div>
    </main>
  );
}