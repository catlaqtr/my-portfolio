/**
 * Where the site lives and whether search engines may index it, decided at
 * build time — used by vite.config.ts and scripts/prerender.mjs.
 *
 * - The official address is PRODUCTION_URL. Every build (production,
 *   preview, local) points canonical/og:url/sitemap URLs there, so previews
 *   never compete with the real site. Set SITE_URL to override (e.g. a
 *   future custom domain).
 * - Preview deployments (VERCEL_ENV=preview) are additionally marked noindex.
 */
export const PRODUCTION_URL = "https://meteunalportfolio.vercel.app";

export function siteSettings(env = process.env) {
  return {
    siteUrl: (env.SITE_URL || PRODUCTION_URL).replace(/\/+$/, ""),
    indexable: env.VERCEL_ENV !== "preview" && env.VERCEL_ENV !== "development",
  };
}
