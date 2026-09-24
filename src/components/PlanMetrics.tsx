"use client";

import { useFitLog } from "@/context/FitLogContext";

const PlanMetrics = () => {
  const { plan } = useFitLog();

  const minutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const calories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-gray-800/80 bg-[#12151a]">
      {/* Exercises */}
      <div className="border-r border-gray-800/80 p-6 sm:p-8">
        <p className="text-xs font-semibold text-gray-400">
          Exercises
        </p>

        <p className="mt-2 text-4xl font-black text-[#ccff00] sm:text-5xl">
          {plan.length}
        </p>
      </div>

      {/* Minutes */}
      <div className="border-r border-gray-800/80 p-6 sm:p-8">
        <p className="text-xs font-semibold text-gray-400">
          Minutes
        </p>

        <p className="mt-2 text-4xl font-black text-white sm:text-5xl">
          {minutes}
        </p>
      </div>

      {/* Calories */}
      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold text-gray-400">
          Calories
        </p>

        <p className="mt-2 text-4xl font-black text-white sm:text-5xl">
          {calories}
        </p>
      </div>
    </div>
  );
};

export default PlanMetrics;