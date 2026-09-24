"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bookmark, CalendarPlus, Check } from "lucide-react";
import { useEffect, useState } from "react";

import { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";

interface WorkoutDetailsProps {
  id: string;
}

const WorkoutDetails = ({ id }: WorkoutDetailsProps) => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToPlan, saveWorkout, isInPlan, isSaved } = useFitLog();

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch("/workouts.json");
        const data: Workout[] = await response.json();

        const foundWorkout = data.find((item) => String(item.id) === id);

        setWorkout(foundWorkout ?? null);
      } catch (error) {
        console.error("Failed to load workout details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-800 border-t-[#ccff00]" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-black uppercase text-white">
          WORKOUT NOT FOUND
        </h1>
        <Link
          href="/"
          className="mt-5 rounded-full bg-[#ccff00] px-6 py-3.5 text-xs font-black uppercase text-black hover:bg-[#b8e600] transition-colors"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 py-4 px-2 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-gray-400 hover:text-[#ccff00] transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Library</span>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-start w-full">
        {/* Left Column: Image Container */}
        <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full overflow-hidden rounded-3xl border border-gray-800/80 bg-[#12151a] shadow-2xl">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Right Column: Information & Details */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          {/* Header Title & Description */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-normal text-white leading-tight">
              {workout.name}
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-gray-300 font-medium max-w-xl">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="flex flex-wrap gap-2 pt-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-md bg-[#ccff00] px-3 py-1.5 text-xs font-black uppercase text-black tracking-wider"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isInPlan(workout.id)}
              className="flex items-center gap-2.5 rounded-xl bg-[#ccff00] px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-black hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-60 transition-all shadow-lg shadow-[#ccff00]/10"
            >
              {isInPlan(workout.id) ? (
                <Check size={18} strokeWidth={3} />
              ) : (
                <CalendarPlus size={18} strokeWidth={2.5} />
              )}
              {isInPlan(workout.id) ? "Already In Plan" : "Add to today's plan"}
            </button>

            <button
              onClick={() => saveWorkout(workout)}
              disabled={isSaved(workout.id)}
              className="flex items-center gap-2.5 rounded-xl border border-gray-700 bg-[#16191e] px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-gray-200 hover:border-[#ccff00] hover:text-[#ccff00] disabled:opacity-60 transition-all"
            >
              <Bookmark size={18} strokeWidth={2.5} />
              {isSaved(workout.id) ? "Saved" : "Save for later"}
            </button>
          </div>

          {/* Specifications Table */}
          <div className="overflow-hidden rounded-2xl border border-gray-800/80 bg-[#12151a] p-2 sm:p-4 shadow-lg">
            {[
              ["EQUIPMENT", workout.equipment],
              ["DIFFICULTY", workout.difficulty],
              ["SETS", workout.sets],
              ["REPS", workout.reps],
              ["DURATION", `${workout.duration} min`],
              ["CALORIES", `${workout.caloriesBurned} kcal`],
              ["RATING", workout.rating],
            ].map(([label, value]) => (
              <div
                key={label as string}
                className="flex justify-between border-b border-gray-800/60 px-4 py-3.5 text-sm sm:text-base last:border-b-0"
              >
                <span className="font-extrabold uppercase tracking-wider text-gray-400 text-xs sm:text-sm">
                  {label}
                </span>
                <span className="font-black text-white">{value}</span>
              </div>
            ))}
          </div>

          {/* Instructions List (Clean without box backgrounds) */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base sm:text-xl font-black uppercase tracking-wider text-white">
              INSTRUCTIONS
            </h2>

            <ol className="space-y-3.5 text-sm sm:text-base leading-relaxed">
              {workout.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3.5 items-start">
                  <span className="font-black text-[#ccff00] min-w-[22px] text-base">
                    {index + 1}.
                  </span>
                  <span className="font-medium text-gray-300">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;