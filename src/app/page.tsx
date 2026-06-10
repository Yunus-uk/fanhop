import Link from "next/link";
import CityGrid from "./CityGrid";

export default function Home() {
  return (
    <div>
      <section className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          Your fan guide to the{" "}
          <span className="text-emerald-400">16 host cities</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-white/70 sm:mx-0">
          Hopping between matches across the USA, Canada and Mexico? FanHop gives you what you
          actually need in each city — how to reach the stadium, live weather, the food fans rave
          about, and the best things to do between games.
        </p>
        <Link
          href="/today"
          className="card mt-5 flex items-center justify-between gap-3 rounded-2xl p-4 text-left transition hover:border-emerald-400/40"
        >
          <div>
            <p className="font-semibold">📅 What&apos;s on today?</p>
            <p className="mt-0.5 text-sm text-white/60">
              Today&apos;s matches, kickoff times and the weather at each stadium.
            </p>
          </div>
          <span className="shrink-0 text-emerald-300">→</span>
        </Link>
      </section>

      <CityGrid />
    </div>
  );
}
