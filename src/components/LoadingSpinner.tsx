"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Bookmark, CalendarPlus, Check } from "lucide-react";
import { useEffect, useState } from "react";

import { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToPlan, saveWorkout, isInPlan, isSaved } = useFitLog();

  useEffect(() => {
    if (!id) return;

    const fetchWorkout = async () => {
      try {
        const response = await fetch("/workouts.json");
        const data: Workout[] = await response.json();

        const foundWorkout = data.find(
          (item) => String(item.id) === String(id)
        );

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
        <LoadingSpinner />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-black uppercase text-white">
          WORKOUT NOT FOUND
        </h1>
        <Link
          href="/"
          className="mt-5 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black hover:bg-[#b8e600] transition-colors"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-6 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
        {/* Left Column: Big Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#12151a]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column: Information & Details */}
        <div className="space-y-6">
          {/* Header Title & Description */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-none">
              {workout.name}
            </h1>

            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-gray-400">
              {workout.description}
            </p>

            {/* Muscle Group Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-black uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Specs Table Container */}
          <div className="rounded-2xl bg-[#13161c] p-5 sm:p-6 space-y-3.5 border border-gray-800/40">
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
                key={label}
                className="flex items-center justify-between text-xs sm:text-sm"
              >
                <span className="font-bold uppercase tracking-wider text-gray-500 text-[10px] sm:text-xs">
                  {label}
                </span>
                <span className="font-bold text-gray-200">{value}</span>
              </div>
            ))}
          </div>

          {/* Instructions List */}
          <div className="space-y-3 pt-1">
            <h2 className="text-sm font-black uppercase tracking-wider text-white">
              INSTRUCTIONS
            </h2>

            <ol className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-gray-400">
              {workout.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-2.5 items-start">
                  <span className="font-semibold text-gray-400">
                    {index + 1}.
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isInPlan(workout.id)}
              className="flex items-center gap-2 rounded-xl bg-[#ccff00] px-6 py-3.5 text-xs font-black uppercase text-black hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-md"
            >
              {isInPlan(workout.id) ? (
                <Check size={16} strokeWidth={3} />
              ) : (
                <CalendarPlus size={16} strokeWidth={2.5} />
              )}
              {isInPlan(workout.id) ? "Already Added" : "Add to today's plan"}
            </button>

            <button
              onClick={() => saveWorkout(workout)}
              disabled={isSaved(workout.id)}
              className="flex items-center gap-2 rounded-xl border border-gray-700/80 bg-transparent px-6 py-3.5 text-xs font-black uppercase text-gray-300 hover:border-gray-500 hover:text-white disabled:opacity-50 transition-all"
            >
              <Bookmark size={16} strokeWidth={2.5} />
              {isSaved(workout.id) ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}