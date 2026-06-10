import Link from "next/link";
import type { Metadata } from "next";
import { getCity } from "@/data/cities";
import { getFixtures, fixtureTime, type Fixture } from "@/lib/fixtures";
import { getHourlyWeather, type Weather } from "@/lib/weather";

export const metadata: Metadata = {
  title: "Today's matches — kickoff times & weather | FanHop",
  description:
    "Every 2026 tournament match on today: kickoff times in stadium-local time, weather at kickoff, and city guides for each venue.",
};

// "2026-06-11" for an instant in a given IANA timezone.
function localDate(d: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: timezone,
  }).format(d);
}

function prettyDate(d: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: timezone,
  }).format(d);
}

export default async function TodayPage() {
  const fixtures = await getFixtures();
  const now = new Date();

  // A match counts as "today" if it's today at its own venue.
  const isToday = (f: Fixture) => {
    const tz = getCity(f.cityId)?.timezone;
    return tz ? localDate(f.kickoffUtc, tz) === localDate(now, tz) : false;
  };

  let matches = fixtures.filter(isToday);
  let heading = "Today's matches";
  let subheading = prettyDate(now, "America/New_York");

  // Rest day: show the next match day instead of an empty page.
  if (matches.length === 0) {
    const next = fixtures.find((f) => f.kickoffUtc.getTime() > now.getTime());
    if (next) {
      const tz = getCity(next.cityId)!.timezone;
      const nextDay = localDate(next.kickoffUtc, tz);
      matches = fixtures.filter((f) => {
        const ftz = getCity(f.cityId)?.timezone;
        return ftz ? localDate(f.kickoffUtc, ftz) === nextDay : false;
      });
      heading = "No matches today — next up";
      subheading = prettyDate(next.kickoffUtc, tz);
    }
  }

  // Kickoff forecast per city involved (cached 30 min server-side).
  const cityIds = [...new Set(matches.map((f) => f.cityId))];
  const forecasts = new Map<string, ((at: Date) => Weather | null) | null>();
  await Promise.all(
    cityIds.map(async (cid) => {
      const city = getCity(cid)!;
      forecasts.set(cid, await getHourlyWeather(city.lat, city.lng));
    }),
  );

  return (
    <div>
      <Link href="/" className="text-sm text-white/50 hover:text-emerald-300">
        ← All host cities
      </Link>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{heading}</h1>
      <p className="mt-1 text-sm text-white/50">{subheading}</p>

      {matches.length === 0 ? (
        <p className="mt-8 text-white/70">The tournament schedule is complete. Thanks for hopping with us!</p>
      ) : (
        <div className="card mt-6 divide-y divide-white/5 rounded-2xl">
          {matches.map((f) => {
            const city = getCity(f.cityId)!;
            const played = f.kickoffUtc.getTime() < now.getTime();
            const kickoffWx =
              !played ? forecasts.get(f.cityId)?.(f.kickoffUtc) ?? null : null;
            return (
              <div
                key={`${f.kickoffUtc.toISOString()}-${f.team1}`}
                className="flex items-center gap-3 p-3 sm:p-4"
              >
                <div className="w-20 shrink-0 text-xs text-white/50">
                  <div className="font-semibold text-white/70">
                    {fixtureTime(f.kickoffUtc, city.timezone)}
                  </div>
                  <div>local time</div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {f.team1} <span className="font-normal text-white/40">vs</span> {f.team2}
                  </p>
                  <p className="text-xs text-white/40">
                    {f.group ?? f.round} ·{" "}
                    <Link
                      href={`/city/${city.id}`}
                      className="text-emerald-300/80 hover:text-emerald-300"
                    >
                      {city.name}
                    </Link>{" "}
                    · {city.stadium}
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
                    <span className="text-base">{kickoffWx.emoji}</span> {kickoffWx.tempC}°C
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-xs text-white/30">
        Kickoff times are shown in each stadium&apos;s local time zone. Weather chips are the
        forecast at kickoff.
      </p>
    </div>
  );
}
