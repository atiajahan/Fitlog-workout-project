"use client";

import { useParams } from "next/navigation";
import WorkoutDetails from "@/components/WorkoutDetails";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) return null;

  return <WorkoutDetails id={id} />;
}