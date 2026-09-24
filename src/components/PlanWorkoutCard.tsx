"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, Flame, Plus, Star, X } from "lucide-react";
import toast from "react-hot-toast";

import { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";

interface PlanWorkoutCardProps {
  workout: Workout;
  type: "plan" | "saved";
}

const PlanWorkoutCard = ({ workout, type }: PlanWorkoutCardProps) => {
  const { removeFromPlan, removeSaved, addToPlan, isInPlan } = useFitLog();

  const handleDone = () => {
    removeFromPlan(workout.id);
    toast.success(`${workout.name} marked as done`);
  };

  const handleAddToPlan = () => {
    addToPlan(workout);
    toast.success(`${workout.name} added to plan`);
  };

  const handleRemove = () => {
    if (type === "plan") {
      removeFromPlan(workout.id);
    } else {
      removeSaved(workout.id);
    }
    toast.success("Workout removed");
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-800/80 bg-[#12151a] p-4 sm:p-5">
      {/* Left Group: Image & Details */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-black/40">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-black uppercase text-white tracking-wide">
            {workout.name}
          </h3>

          <p className="text-xs text-gray-400 font-medium">
            {workout.equipment}
          </p>

          <div className="flex items-center gap-3 pt-1 text-[11px] font-medium text-gray-400">
            <span className="flex items-center gap-1">
              <Clock3 size={13} />
              {workout.duration} min
            </span>

            <span className="flex items-center gap-1">
              <Flame size={13} />
              {workout.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-1">
              <Star size={13} className="text-gray-400 fill-gray-400" />
              {workout.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Right Group: Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 border-gray-800/60 pt-3 sm:pt-0">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-gray-700/80 bg-[#16191e] px-4 py-2 text-xs font-bold text-gray-300 hover:border-gray-500 hover:text-white transition-all"
        >
          View Details
        </Link>

        {type === "plan" ? (
          <button
            onClick={handleDone}
            className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black text-black hover:bg-[#b8e600] transition-all shadow-sm"
          >
            <Check size={14} strokeWidth={3} />
            Mark as Done
          </button>
        ) : (
          <button
            onClick={handleAddToPlan}
            disabled={isInPlan(workout.id)}
            className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black text-black hover:bg-[#b8e600] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            {isInPlan(workout.id) ? (
              <>
                <Check size={14} strokeWidth={3} />
                In Plan
              </>
            ) : (
              <>
                <Plus size={14} strokeWidth={3} />
                Add to Plan
              </>
            )}
          </button>
        )}

        <button
          onClick={handleRemove}
          className="p-2 text-gray-500 hover:text-red-400 transition-colors"
          aria-label="Remove workout"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default PlanWorkoutCard;