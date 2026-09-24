"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "@/types/workout";

type SortType = "duration" | "calories" | "rating";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortType>("duration");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/workouts.json");

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    return b.rating - a.rating;
  });

  return (
    <section id="library" className="w-full py-6 md:py-8 space-y-8">
      {/* Left-side Text & Sort Section inside a Styled Card Container */}
      <div className="w-full rounded-2xl border border-gray-800/80 bg-[#12151a] p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 shadow-lg">
        {/* Left Side Content Area with Balanced Margins */}
        <div className="space-y-3">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#baff00] block">
            WORKOUT LIBRARY
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            THE LIBRARY
          </h2>

          <p className="text-sm sm:text-base font-medium text-gray-400 max-w-lg leading-relaxed">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Right Side Sort Filter Area with Clear Text Sizing */}
        <div className="flex items-center gap-3 self-start sm:self-auto bg-[#1a1e26] border border-gray-700/80 px-4 py-3 rounded-xl shadow-inner">
          <label
            htmlFor="sort"
            className="text-sm font-extrabold uppercase text-gray-300 tracking-wider whitespace-nowrap"
          >
            Sort By
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="bg-transparent text-sm font-black text-[#baff00] outline-none cursor-pointer pr-1"
          >
            <option value="duration" className="bg-[#12151a] text-white font-medium">
              Duration
            </option>
            <option value="calories" className="bg-[#12151a] text-white font-medium">
              Calories
            </option>
            <option value="rating" className="bg-[#12151a] text-white font-medium">
              Rating
            </option>
          </select>
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="flex min-h-80 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2b2f37] border-t-[#baff00]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WorkoutLibrary;