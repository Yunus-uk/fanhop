# ⚽ FanHop

**The fan city companion for the 2026 soccer tournament in the USA, Canada & Mexico.**

FanHop is for fans hopping between the 16 host cities: how to reach each stadium, the match schedule with kickoff-time weather, what to eat, and what to do between matches. It's deliberately *not* another live-scores app — the differentiator is the multi-city travel and logistics layer.

> FanHop is an independent fan project, not affiliated with or endorsed by FIFA.

## Features

- **16 host city guides** — stadium directions with real transit info, local food picks, and things to do between matches
- **Match schedule per city** — all 104 fixtures with accurate kickoff times in each city's local timezone; knockout teams and scores fill in automatically as the tournament progresses
- **Kickoff-time weather** — live conditions per city, plus the hourly forecast *at kickoff* for upcoming matches (16-day window)
- **Installable PWA** — add to home screen, works like an app, no store download needed

## Stack

- [Next.js 15](https://nextjs.org) (App Router, static generation + ISR) · React 19 · Tailwind CSS v4 · TypeScript
- **Weather:** [Open-Meteo](https://open-meteo.com/) — free, no API key, revalidated every 30 min
- **Fixtures:** [openfootball/worldcup.json](https://github.com/openfootball/worldcup.json) — public domain, revalidated hourly, with a bundled snapshot fallback (`src/data/fixtures-snapshot.json`)
- No API keys or environment variables required

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (21 static pages)
```

Key files:

| Path | Purpose |
|---|---|
| `src/data/cities.ts` | All 16 host cities: stadium, transit, food, activities |
| `src/lib/fixtures.ts` | Fixture fetching/parsing + venue→city mapping |
| `src/lib/weather.ts` | Current weather + hourly kickoff forecasts |
| `src/app/city/[id]/page.tsx` | City detail page |

## Deployment

Deployed on [Vercel](https://vercel.com) — every push to `main` auto-deploys.
