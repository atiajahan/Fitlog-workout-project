import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function HomePage() {
  return (
    <main className="w-full space-y-8 md:space-y-12">
      <Hero />
      <WorkoutLibrary />
    </main>
  );
}