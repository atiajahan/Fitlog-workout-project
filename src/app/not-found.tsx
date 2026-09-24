import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-bold tracking-[0.2em] text-[#baff00]">
        404
      </p>

      <h1 className="mt-3 text-5xl font-bold uppercase">
        PAGE NOT FOUND
      </h1>

      <p className="mt-3 text-gray-500">
        The workout or page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-7 rounded-md bg-[#baff00] px-6 py-3 text-sm font-bold text-black"
      >
        BACK TO WORKOUTS
      </Link>
    </main>
  );
}