import { pages, type PageMeta } from "../content/seo";
import { profile } from "../content/about";
import { contactLinks } from "../content/contact";
import { skills } from "../content/skills";

/** The share image in /public (1200×630 pixel-art village). */
export const OG_IMAGE = { path: "/og-image.png", width: 1200, height: 630, alt: "Hearthvale, Mete Ünal's pixel-art portfolio village" };

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** schema.org Person data, so search engines can connect the site to its owner's profiles. */
export function personJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    ...(siteUrl && { url: siteUrl }),
    jobTitle: "Java backend developer",
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Humber College" },
      { "@type": "CollegeOrUniversity", name: "Istanbul University" },
    ],
    sameAs: contactLinks.filter((l) => l.href.startsWith("https://")).map((l) => l.href),
    knowsAbout: skills.filter((s) => s.status === "applied").map((s) => s.name),
  };
}

/**
 * Everything route-specific in <head>. Absolute URLs (canonical, og:url,
 * og:image) need the public site address; without it they're left out or
 * relative rather than guessed. `indexable` is false on preview deploys.
 */
export function headTags(meta: PageMeta, siteUrl: string, indexable: boolean): string {
  const url = siteUrl ? siteUrl + meta.path : "";
  const image = (siteUrl || "") + OG_IMAGE.path;
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    indexable ? "" : `<meta name="robots" content="noindex, nofollow" />`,
    url ? `<link rel="canonical" href="${url}" />` : "",
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(profile.name)} — Portfolio" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    url ? `<meta property="og:url" content="${url}" />` : "",
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${escape(OG_IMAGE.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(personJsonLd(siteUrl)).replace(/</g, "\\u003c")}</script>`,
  ];
  return tags.filter(Boolean).join("\n    ");
}

export function robotsTxt(siteUrl: string, indexable: boolean): string {
  if (!indexable) return "# Preview deployment: keep it out of search results.\nUser-agent: *\nDisallow: /\n";
  return ["User-agent: *", "Allow: /", siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml` : ""].join("\n") + "\n";
}

/** Every public page; the classic Recruiter Mode pages get the highest priority. */
export function sitemapXml(siteUrl: string): string {
  const priority: Record<string, string> = { "/": "1.0", "/play": "0.6" };
  const urls = pages.map(
    (p) => `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <priority>${priority[p.path] ?? "0.8"}</priority>\n  </url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}
