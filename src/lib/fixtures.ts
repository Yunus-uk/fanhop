// 2026 tournament fixtures via openfootball/worldcup.json — public domain, no API key.
// https://github.com/openfootball/worldcup.json
// Fetched live (revalidated hourly) so knockout teams fill in as the tournament
// progresses; falls back to the bundled snapshot if the fetch fails.

import snapshot from "@/data/fixtures-snapshot.json";

const FIXTURES_URL =
  "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";

export interface Fixture {
  num?: number;
  round: string; // "Matchday 3", "Round of 32", "Final", ...
  group?: string; // "Group A" (group stage only)
  team1: string;
  team2: string;
  kickoffUtc: Date;
  cityId: string;
  score?: string; // "2–1" once played
}

// openfootball "ground" names -> our city ids (src/data/cities.ts)
const GROUND_TO_CITY: Record<string, string> = {
  "Atlanta": "atlanta",
  "Boston (Foxborough)": "boston",
  "Dallas (Arlington)": "dallas",
  "Guadalajara (Zapopan)": "guadalajara",
  "Houston": "houston",
  "Kansas City": "kansas-city",
  "Los Angeles (Inglewood)": "los-angeles",
  "Mexico City": "mexico-city",
  "Miami (Miami Gardens)": "miami",
  "Monterrey (Guadalupe)": "monterrey",
  "New York/New Jersey (East Rutherford)": "new-york",
  "Philadelphia": "philadelphia",
  "San Francisco Bay Area (Santa Clara)": "bay-area",
  "Seattle": "seattle",
  "Toronto": "toronto",
  "Vancouver": "vancouver",
};

interface RawMatch {
  num?: number;
  round?: string;
  date?: string; // "2026-06-11"
  time?: string; // "13:00 UTC-6"
  team1?: string | { name?: string };
  team2?: string | { name?: string };
  group?: string;
  ground?: string;
  score1?: number | null;
  score2?: number | null;
}

function teamName(t: RawMatch["team1"]): string {
  if (typeof t === "string") return prettyPlaceholder(t);
  return prettyPlaceholder(t?.name ?? "TBD");
}

// Knockout placeholders like "1E", "2C", "3A/B/C/D/F", "W101" -> readable labels.
function prettyPlaceholder(t: string): string {
  let m = t.match(/^1([A-L])$/);
  if (m) return `Group ${m[1]} winner`;
  m = t.match(/^2([A-L])$/);
  if (m) return `Group ${m[1]} runner-up`;
  m = t.match(/^3([A-L](?:\/[A-L])+)$/);
  if (m) return `3rd place (Group ${m[1]})`;
  m = t.match(/^W(\d+)$/);
  if (m) return `Winner of match ${m[1]}`;
  m = t.match(/^L(\d+)$/);
  if (m) return `Loser of match ${m[1]}`;
  return t;
}

// "2026-06-11" + "13:00 UTC-6" -> UTC instant. Returns null if unparseable.
function parseKickoff(date?: string, time?: string): Date | null {
  if (!date || !time) return null;
  const m = time.match(/^(\d{1,2}):(\d{2})\s*UTC([+-])(\d{1,2})(?::(\d{2}))?$/);
  if (!m) return null;
  const [, hh, mm, sign, offH, offM] = m;
  const iso = `${date}T${hh.padStart(2, "0")}:${mm}:00${sign}${offH.padStart(2, "0")}:${offM ?? "00"}`;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

function parseMatches(data: unknown): Fixture[] {
  const matches: RawMatch[] =
    (data as { matches?: RawMatch[] })?.matches ?? [];
  const out: Fixture[] = [];
  for (const raw of matches) {
    const cityId = GROUND_TO_CITY[raw.ground ?? ""];
    const kickoffUtc = parseKickoff(raw.date, raw.time);
    if (!cityId || !kickoffUtc) continue; // skip anything we can't place
    out.push({
      num: raw.num,
      round: raw.round ?? "",
      group: raw.group,
      team1: teamName(raw.team1),
      team2: teamName(raw.team2),
      kickoffUtc,
      cityId,
      score:
        raw.score1 != null && raw.score2 != null
          ? `${raw.score1}–${raw.score2}`
          : undefined,
    });
  }
  return out.sort((a, b) => a.kickoffUtc.getTime() - b.kickoffUtc.getTime());
}

export async function getFixtures(): Promise<Fixture[]> {
  try {
    // Revalidate hourly so scores and knockout teams stay current.
    const res = await fetch(FIXTURES_URL, { next: { revalidate: 3600 } });
    if (res.ok) {
      const fixtures = parseMatches(await res.json());
      if (fixtures.length > 0) return fixtures;
    }
  } catch {
    // fall through to snapshot
  }
  return parseMatches(snapshot);
}

export async function getCityFixtures(cityId: string): Promise<Fixture[]> {
  return (await getFixtures()).filter((f) => f.cityId === cityId);
}

// "Sat, Jun 13" / "7:00 PM" in the city's local time zone.
export function fixtureDate(d: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: timezone,
  }).format(d);
}

export function fixtureTime(d: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(d);
}
