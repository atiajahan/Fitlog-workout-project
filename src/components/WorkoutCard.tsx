"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-800/80 bg-[#12151a] hover:border-[#baff00]/50 transition-all duration-300 shadow-lg"
    >
      {/* Image Container with Proper Aspect Ratio (Aspect-4/3 prevents stretching) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1a1e26]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 space-y-3">
        <div>
          {/* Muscle Groups */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-md bg-[#baff00] px-2.5 py-1 text-xs font-black uppercase tracking-wide text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Title & Equipment */}
          <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wide group-hover:text-[#baff00] transition-colors leading-tight">
            {workout.name}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-gray-400 mt-1">
            {workout.equipment}
          </p>
        </div>

        {/* Footer Specs */}
        <div className="flex items-center justify-between border-t border-gray-800/80 pt-3 text-xs sm:text-sm font-bold text-gray-300">
          <div className="flex items-center gap-1.5">
            <Clock size={15} className="text-[#baff00]" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame size={15} className="text-[#baff00]" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Star size={15} className="fill-[#baff00] text-[#baff00]" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}