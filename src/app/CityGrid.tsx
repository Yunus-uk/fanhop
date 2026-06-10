"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CITIES, COUNTRIES, type Country } from "@/data/cities";

type Filter = "All" | Country;

export default function CityGrid() {
  const [filter, setFilter] = useState<Filter>("All");

  const cities = useMemo(
    () => (filter === "All" ? CITIES : CITIES.filter((c) => c.country === filter)),
    [filter],
  );

  const tabs: Filter[] = ["All", ...COUNTRIES];

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = t === filter;
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                active
                  ? "bg-emerald-500 text-black"
                  : "border border-white/15 text-white/70 hover:border-emerald-400/50 hover:text-white"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => (
          <Link
            key={c.id}
            href={`/city/${c.id}`}
            className="card group flex flex-col gap-2 rounded-2xl p-5 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{c.flag}</span>
              <span className="text-xs uppercase tracking-wider text-emerald-300/70">
                {c.country}
              </span>
            </div>
            <h3 className="text-lg font-semibold leading-tight group-hover:text-emerald-300">
              {c.name}
            </h3>
            <p className="text-xs text-white/50">{c.region}</p>
            <p className="mt-1 text-sm text-white/70">🏟️ {c.stadium}</p>
            <span className="mt-2 text-sm font-medium text-emerald-400 opacity-0 transition group-hover:opacity-100">
              Open city guide →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
