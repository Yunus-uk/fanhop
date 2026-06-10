import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CITIES, getCity } from "@/data/cities";
import { getWeather, localTime } from "@/lib/weather";

export function generateStaticParams() {
  return CITIES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const city = getCity(id);
  if (!city) return { title: "City not found — FanHop" };
  return {
    title: `${city.name} fan guide — stadium, weather & food | FanHop`,
    description: `Visiting ${city.name} for the 2026 soccer tournament? ${city.stadium} directions, live weather, local food and the best things to do between matches.`,
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-300/80">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const city = getCity(id);
  if (!city) notFound();

  const weather = await getWeather(city.lat, city.lng);
  const time = localTime(city.timezone);

  return (
    <div>
      <Link href="/" className="text-sm text-white/50 hover:text-emerald-300">
        ← All host cities
      </Link>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-3xl">{city.flag}</span>
            <span className="text-xs uppercase tracking-wider text-emerald-300/70">
              {city.country}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{city.name}</h1>
          <p className="text-sm text-white/50">{city.region}</p>
        </div>

        <div className="card shrink-0 rounded-2xl px-4 py-3 text-center">
          {weather ? (
            <>
              <div className="text-3xl leading-none">{weather.emoji}</div>
              <div className="mt-1 text-xl font-bold">
                {weather.tempC}°C
                <span className="text-sm font-normal text-white/50"> / {weather.tempF}°F</span>
              </div>
              <div className="text-xs text-white/60">{weather.label}</div>
            </>
          ) : (
            <div className="text-xs text-white/50">Weather unavailable</div>
          )}
          <div className="mt-2 border-t border-white/10 pt-2 text-xs text-white/50">
            🕑 {time} local
          </div>
        </div>
      </div>

      <p className="mt-4 text-white/80">{city.blurb}</p>

      <Section title="🏟️ Getting to the stadium">
        <div className="card rounded-2xl p-4">
          <p className="font-semibold">{city.stadium}</p>
          <p className="text-sm text-white/50">{city.stadiumArea}</p>
          <p className="mt-2 text-sm text-white/80">{city.gettingThere}</p>
        </div>
      </Section>

      <Section title="🍔 What to eat">
        <div className="grid gap-3 sm:grid-cols-2">
          {city.food.map((f) => (
            <div key={f.name} className="card rounded-2xl p-4">
              <p className="font-semibold">{f.name}</p>
              <p className="mt-1 text-sm text-white/70">{f.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="📍 Best things to do between matches">
        <div className="grid gap-3 sm:grid-cols-2">
          {city.doThis.map((d) => (
            <div key={d.name} className="card rounded-2xl p-4">
              <p className="font-semibold">{d.name}</p>
              <p className="mt-1 text-sm text-white/70">{d.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <p className="mt-8 text-center text-xs text-white/30">
        Weather is live; kickoff planning uses {city.name}&apos;s local time zone.
      </p>
    </div>
  );
}
