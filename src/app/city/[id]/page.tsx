import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CITIES, getCity } from "@/data/cities";
import { getWeather, getHourlyWeather, localTime } from "@/lib/weather";
import { getCityFixtures, fixtureDate, fixtureTime } from "@/lib/fixtures";

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
    title: `${city.name} fan guide — stadium, weather, food & where to watch | FanHop`,
    description: `Visiting ${city.name} for the 2026 soccer tournament? ${city.stadium} directions, live weather, local food, where to watch the matches and the best things to do between games.`,
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

// Opens Google Maps searching for the place; from there the user gets
// directions, transit and rideshare options for free.
function PlaceLink({ name, area }: { name: string; area: string }) {
  const href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name}, ${area}`,
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold hover:text-emerald-300"
      title="Open in Google Maps for directions & transit"
    >
      {name} <span className="text-xs font-normal text-white/30">↗</span>
    </a>
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

  const cityQuery = city.name.split("/")[0].trim();
  const weather = await getWeather(city.lat, city.lng);
  const time = localTime(city.timezone);
  const fixtures = await getCityFixtures(city.id);
  const forecastAt = await getHourlyWeather(city.lat, city.lng);
  const now = Date.now();

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
          <p><PlaceLink name={city.stadium} area={cityQuery} /></p>
          <p className="text-sm text-white/50">{city.stadiumArea}</p>
          <p className="mt-2 text-sm text-white/80">{city.gettingThere}</p>
        </div>
      </Section>

      {fixtures.length > 0 && (
        <Section title={`📅 Matches at ${city.stadium}`}>
          <div className="card divide-y divide-white/5 rounded-2xl">
            {fixtures.map((f) => {
              const played = f.kickoffUtc.getTime() < now;
              const kickoffWx = !played && forecastAt ? forecastAt(f.kickoffUtc) : null;
              return (
                <div
                  key={`${f.kickoffUtc.toISOString()}-${f.team1}`}
                  className={`flex items-center gap-3 p-3 sm:p-4 ${played && !f.score ? "opacity-50" : ""}`}
                >
                  <div className="w-20 shrink-0 text-xs text-white/50">
                    <div className="font-semibold text-white/70">
                      {fixtureDate(f.kickoffUtc, city.timezone)}
                    </div>
                    <div>{fixtureTime(f.kickoffUtc, city.timezone)}</div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {f.team1} <span className="font-normal text-white/40">vs</span> {f.team2}
                    </p>
                    <p className="text-xs text-white/40">
                      {f.group ?? f.round}
                    </p>
                  </div>
                  {f.score && (
                    <div className="shrink-0 rounded-lg bg-white/10 px-2 py-1 text-sm font-bold">
                      {f.score}
                    </div>
                  )}
                  {kickoffWx && (
                    <div
                      className="shrink-0 text-right text-xs text-white/60"
                      title={`Forecast at kickoff: ${kickoffWx.label}`}
                    >
                      <span className="text-base">{kickoffWx.emoji}</span>{" "}
                      {kickoffWx.tempC}°C
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-white/30">
            Kickoff times shown in {city.name} local time. Weather chips are the
            forecast at kickoff (next 16 days).
          </p>
        </Section>
      )}

      <Section title="📺 Where to watch">
        <div className="card rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/80">
            Fan gathering
          </p>
          <p className="mt-1 text-sm text-white/80">{city.watch.hub}</p>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {city.watch.bars.map((b) => (
            <div key={b.name} className="card rounded-2xl p-4">
              <p><PlaceLink name={b.name} area={cityQuery} /></p>
              <p className="mt-1 text-sm text-white/70">{b.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-white/30">
          For matches you don&apos;t have tickets to. Bar moved or closed?{" "}
          <a
            href={`mailto:hello@fanhop.app?subject=${encodeURIComponent(`${city.name} — where to watch`)}`}
            className="text-emerald-400/80 hover:text-emerald-300"
          >
            Let us know
          </a>
          .
        </p>
      </Section>

      <Section title="🍔 What to eat">
        <div className="grid gap-3 sm:grid-cols-2">
          {city.food.map((f) => (
            <div key={f.name} className="card rounded-2xl p-4">
              <p><PlaceLink name={f.name} area={cityQuery} /></p>
              <p className="mt-1 text-sm text-white/70">{f.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="📍 Best things to do between matches">
        <div className="grid gap-3 sm:grid-cols-2">
          {city.doThis.map((d) => (
            <div key={d.name} className="card rounded-2xl p-4">
              <p><PlaceLink name={d.name} area={cityQuery} /></p>
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
