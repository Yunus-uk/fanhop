# FanHop Pick'em — v1 Spec

Private prediction leagues for the Premier League season. You create a league, share one link, your mates predict scores each matchday, the table updates itself. No accounts, no app store, no expiry date.

## Why this shape

Three findings from the 2026 World Cup post-mortem drive every decision here:

1. **Participation beats information.** FotMob's Predictor was its standout feature — so heavily used it broke under load. People reopen an app to check a prediction; they don't reopen it to re-read a fixtures list.
2. **Distribution must be inside the product.** FanHop needed strangers to find it. This needs one person to invite ten. The product doesn't work solo, so every user recruits their own cohort.
3. **No event deadline.** The PL season runs August–May, every season, forever. No opening-week spike to miss.

## The one rule

**No account creation.** Ever. This is the whole edge over Superbru, Kicktipp and FPL mini-leagues, all of which demand an email and a verification click.

- Create a league → you get a link. That's it.
- Open the link → type a display name → you're in and predicting.
- Identity lives in a signed cookie. No password, no email, no profile.

If setup takes longer than ten seconds, the spec has been violated.

## v1 scope — in

- Create a league (name it, get a share link + 6-char code)
- Join via link, pick a display name, claim a seat
- Predict exact scores for the upcoming matchday's 10 fixtures
- Edit a prediction any time before that individual fixture kicks off
- Automatic scoring once full-time scores land
- League table: total points, exact scores hit, matchday-by-matchday breakdown
- A per-player recovery link so a cleared cookie isn't fatal
- Mobile-first, installable PWA (already solved in this repo)

## v1 scope — explicitly out

Resist all of these. Each one is a week you don't have, and none of them fixes the failure mode from last time.

- User accounts, email, OAuth, password reset
- Push notifications
- Any competition other than the Premier League
- Public/global leagues or leaderboards
- Chat, comments, avatars, reactions
- Payments, prizes, entry fees
- Native app / Play Store
- Bonus rules: jokers, doubles, banker picks, handicaps
- Head-to-head, knockout formats, mini-league splits

## Scoring

Deliberately the classic, boring ruleset — everyone already understands it and it needs no explanation in the UI.

| Outcome | Points |
|---|---|
| Exact score correct | 3 |
| Correct result (W/D/L), wrong score | 1 |
| Wrong result | 0 |
| No prediction submitted | 0 |

Not configurable in v1. One ruleset means no settings screen, no migration path, no arguments.

## Deadlines

Predictions lock **per fixture at its own kickoff**, not per matchday.

Simpler to reason about, fairer (nobody is punished for joining on a Saturday afternoon), and it means a late joiner can still play the Sunday games. Locking is enforced server-side on write — never trust the client clock.

## Data source

`https://raw.githubusercontent.com/openfootball/football.json/master/2026-27/en.1.json`

Public domain, no API key, same publisher as the World Cup source this repo already uses. Verified live: contains the full 2026/27 fixture list with `score.ft` populated for played matches.

The shape differs from the World Cup file in two ways that matter:

```json
{"round": "Matchday 1",
 "date": "2026-08-21",
 "time": "20:00",
 "team1": "Arsenal FC",
 "team2": "Coventry City FC",
 "score": {"ht": [2, 0], "ft": [3, 0]}}
```

1. **Times are local (Europe/London) with no UTC offset**, unlike the World Cup file's `"13:00 UTC-6"`. Parse as `Europe/London` and convert to UTC on the way in. Do not reuse `parseKickoff()` as-is.
2. **There are no match ids.** The World Cup file had `num`; this doesn't.

### Fixture keys (gotcha)

Predictions must reference a stable key. Do **not** key on date — postponements are routine in the PL and would orphan every prediction on that match.

Key on matchday + teams:

```
md3-manchester-city-fc__arsenal-fc
```

Round number and the two clubs are stable across a rescheduling; the date is not. Store the key on the prediction row and re-resolve the fixture from the feed each time.

## Architecture

Keep the existing stack: Next.js 15.5.19, React 19, Tailwind 4, TypeScript, Vercel. Add exactly one thing — a database.

- **Postgres via Neon** (Vercel marketplace integration). Chosen over Supabase because we want no auth layer, and Supabase's main value is auth.
- **Drizzle ORM** for typed schema and migrations.
- No Redis, no queue, no separate backend service.

### Schema

```
leagues
  id            uuid pk
  code          text unique        -- 6 chars, human-readable, ambiguity-free alphabet
  name          text
  season        text               -- "2026-27"
  created_at    timestamptz

players
  id            uuid pk
  league_id     uuid fk -> leagues
  display_name  text
  token_hash    text               -- HMAC of the cookie token; never store raw
  created_at    timestamptz
  unique (league_id, display_name)

predictions
  id            uuid pk
  player_id     uuid fk -> players
  fixture_key   text
  home_goals    smallint
  away_goals    smallint
  updated_at    timestamptz
  unique (player_id, fixture_key)
```

Points are **not** stored. Recompute from predictions + live feed on read, then cache. Storing derived points invites drift the first time a score is corrected.

### Identity

- On joining, mint a random 32-byte token. Set it as an `httpOnly`, `SameSite=Lax`, 1-year cookie. Store only its HMAC server-side.
- Every write re-derives the player from the cookie. There is no client-supplied player id, ever.
- Show each player a **recovery link** (`/l/<code>/resume?t=<token>`) once, on join, with "bookmark this if you use another device". This is the honest trade for having no accounts — name it in the UI rather than hiding it.

### Results job

Vercel Cron, hourly.

1. Fetch the feed.
2. For every fixture with `score.ft`, recompute points for all predictions on that key.
3. Idempotent by construction — always recompute, never increment.

Hourly is sufficient. Nobody needs sub-minute pick'em scoring, and it keeps the whole thing inside Vercel's free tier.

## Key flows

**Create** — `/new` → name it → insert league + first player → redirect to `/l/<code>` with the share link shown prominently and a copy button.

**Join** — `/l/<code>` with no cookie → name prompt → seat claimed → straight into this matchday's predictions. No interstitial, no welcome tour.

**Predict** — one screen, 10 fixtures, two number inputs each. Autosave on change; no submit button. Locked fixtures render read-only with the actual score alongside the prediction.

**Table** — total, exact-score count, and a per-matchday grid. After a fixture kicks off, everyone's predictions for it become visible to the league — that reveal is the thing that makes it fun, so don't bury it.

## What transfers from this repo, what dies

**Keep:** the domain, Vercel project, PWA/service worker, OG image generation, `src/lib/site.ts`, Tailwind setup, and the general approach in `src/lib/fixtures.ts` (rewritten for the new shape, not reused verbatim).

**Delete:** `src/data/cities.ts`, `src/data/fixtures-snapshot.json`, `src/app/city/`, `src/app/CityGrid.tsx`, `src/app/today/`, `src/lib/weather.ts`, `twa/`. All of it is World Cup scaffolding.

Do not adapt the city pages into anything. That is how this becomes FanHop again.

## Build order

1. `src/lib/pl-fixtures.ts` — fetch, parse, `Europe/London` handling, fixture keys
2. Neon + Drizzle schema + migrations
3. Create / join league, cookie identity
4. Predictions screen with autosave and server-side lock enforcement
5. Scoring module + hourly cron
6. League table with the post-kickoff reveal
7. Strip the World Cup pages, repoint the homepage
8. Ship to fanhop.app

Steps 1–6 are the product. Nothing before step 8 needs to look finished.

## Risks

- **Feed latency.** openfootball is community-maintained via git commits. It is current as of today (matchdays 1–3 scored, correct for 17 Sep), but if results routinely land late, the table goes stale on a Saturday night — the product feels dead at exactly its peak moment. *Mitigation:* if latency proves bad, swap to football-data.org's free tier, which covers PL results at 10 requests/minute. Keep the fetch behind one module so this is a one-file change.
- **Cookie loss.** Mitigated by recovery links, but it will still happen to someone. Accept it as the cost of no accounts.
- **Cold start is social, not technical.** The product works the moment two people use it — but you still have to be the person who starts the first league and invites real people. That's the part that failed last time, and no amount of code fixes it.

## Note on AGENTS.md

`AGENTS.md` instructs reading `node_modules/next/dist/docs/` before writing code. That directory does not exist in this install (Next 15.5.19) — only `README.md` and `license.md` ship in the package. Either the docs were dropped from the published tarball or the path changed. Worth resolving before implementation, since Server Actions and caching semantics are exactly the areas this build touches.
