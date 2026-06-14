# FanHop Android (TWA) — build & submit runbook

This wraps the live PWA at **https://fanhop.app** as a Trusted Web Activity (TWA),
producing an `.aab` (Android App Bundle) to upload to the Google Play Console.

- **Package ID:** `app.fanhop`
- **Account type:** personal → **14-day closed test with 12+ testers is required** before production.
- **Goal timeline:** start the closed test ASAP so production lands during the World Cup knockout rounds (Round of 16 onward, early July).

---

## What's already done (in this repo)

- `twa/twa-manifest.json` — Bubblewrap config, fully filled in.
- `public/.well-known/assetlinks.json` — Digital Asset Links file, served at
  `https://fanhop.app/.well-known/assetlinks.json`. **The SHA-256 is a placeholder**
  and must be filled in after you get the signing fingerprint (Step 4).

---

## Build the .aab

This machine has **Java 8 and no Android SDK**, so pick one path.

### Path A — PWABuilder (recommended: zero local toolchain) ⭐

1. Go to <https://www.pwabuilder.com> and enter `https://fanhop.app`.
2. Click **Package For Stores → Android → Google Play**.
3. In options, set **Package ID = `app.fanhop`** (must match `assetlinks.json`).
   Keep "Signing key" = **"Create new"** (PWABuilder generates one and returns it in the zip).
4. Download the zip. It contains:
   - `app-release-bundle.aab` ← upload this to Play
   - `signing.keystore` + `signing-key-info.txt` ← **back these up safely; you need them for every future update**
   - `assetlinks.json` ← contains the real SHA-256 fingerprint.

### Path B — Bubblewrap locally (needs JDK 17 + Android SDK)

```bash
npm i -g @bubblewrap/cli
cd twa
# Bubblewrap can auto-download the JDK + Android SDK on first run (interactive):
bubblewrap build        # reads twa-manifest.json, prompts to create a keystore
# outputs app-release-bundle.aab in this folder
```
Back up `twa/android.keystore` — losing it means you can never update the app.

---

## Submit to Google Play

1. **Play Console → Create app** → name "FanHop", category Sports/Travel, free.
2. **Closed testing → create a track** → upload the `.aab`.
3. **Add 12+ testers** (your own list, or a paid closed-testing service). They must
   opt in via the test link and keep the app installed for **14 consecutive days**.
4. **Get the signing SHA-256:**
   - Play Console → **Test and release → App integrity → App signing**.
   - Copy the **SHA-256 certificate fingerprint**.
   - Paste it into `public/.well-known/assetlinks.json` (replace
     `REPLACE_WITH_SHA256_FROM_PLAY_CONSOLE`), commit, and redeploy fanhop.app.
   - Verify: `curl https://fanhop.app/.well-known/assetlinks.json` returns the real fingerprint.
   - This is what hides the browser URL bar inside the app. ⚠️ Use the fingerprint
     from **Play App Signing**, not your upload key — Google re-signs the app.
5. After 14 days of active testers → **Apply for production access** → submit production release.

---

## Notes

- If you later register an **organization** Play account (legal business entity),
  the 14-day/12-tester requirement is waived — straight to production.
- Keep the keystore + Play App Signing enrollment forever; they gate all future updates.
