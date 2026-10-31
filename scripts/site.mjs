/**
 * Where the site lives and whether search engines may index it, decided at
 * build time — used by vite.config.ts and scripts/prerender.mjs.
 *
 * - The official address is PRODUCTION_URL (the custom domain, www form).
 *   Every build (production, preview, local) points canonical, og:url,
 *   sitemap and structured-data URLs there, so no other address competes
 *   with it. Set SITE_URL to override.
 * - Preview deployments (VERCEL_ENV=preview) are additionally marked noindex.
 * - The old Vercel address (LEGACY_HOSTS) redirects here permanently; see
 *   the "redirects" in vercel.json. The apex meteunal.dev → www redirect is
 *   configured in Vercel's domain settings.
 */
export const PRODUCTION_URL = "https://www.meteunal.dev";

/** Former production addresses that must permanently redirect to PRODUCTION_URL. */
export const LEGACY_HOSTS = ["meteunalportfolio.vercel.app"];

export function siteSettings(env = process.env) {
  return {
    siteUrl: (env.SITE_URL || PRODUCTION_URL).replace(/\/+$/, ""),
    indexable: env.VERCEL_ENV !== "preview" && env.VERCEL_ENV !== "development",
  };
}
