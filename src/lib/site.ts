// Canonical site URL. Vercel sets VERCEL_PROJECT_PRODUCTION_URL to the
// production domain (and updates it automatically if a custom domain is added).
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
