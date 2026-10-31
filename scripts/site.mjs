/**
 * Where the site lives and whether search engines may index it, decided at
 * build time — used by vite.config.ts and scripts/prerender.mjs.
 *
 * - SITE_URL: set it to override (e.g. a custom domain). Otherwise, on
 *   Vercel, the project's production domain is used
 *   (VERCEL_PROJECT_PRODUCTION_URL, provided automatically). Locally it's
 *   unknown and absolute-URL tags are skipped rather than guessed.
 * - Preview deployments (VERCEL_ENV=preview) are marked noindex.
 */
export function siteSettings(env = process.env) {
  const raw = env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : "");
  return {
    siteUrl: raw.replace(/\/+$/, ""),
    indexable: env.VERCEL_ENV !== "preview" && env.VERCEL_ENV !== "development",
  };
}
