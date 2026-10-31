import { describe, expect, it } from "vitest";
import { pages, pageMeta } from "../content/seo";
import { headTags, personJsonLd, robotsTxt, sitemapXml } from "./head";
import { siteSettings } from "../../scripts/site.mjs";

const SITE = "https://portfolio.example";

describe("page metadata", () => {
  it("covers every route", () => {
    expect(pages.map((p) => p.path).sort()).toEqual(["/", "/about", "/contact", "/play", "/portfolio", "/projects"]);
  });

  it("keeps titles and descriptions within search-result limits", () => {
    for (const p of pages) {
      expect(p.title.length, p.path).toBeLessThanOrEqual(60);
      expect(p.description.length, p.path).toBeGreaterThanOrEqual(50);
      expect(p.description.length, p.path).toBeLessThanOrEqual(160);
    }
    expect(new Set(pages.map((p) => p.title)).size).toBe(pages.length);
  });

  it("pre-renders every Recruiter Mode page but not the game", () => {
    expect(pages.filter((p) => p.prerender).map((p) => p.path)).toEqual(["/", "/portfolio", "/about", "/projects", "/contact"]);
  });

  it("falls back to the home page's metadata for unknown paths", () => {
    expect(pageMeta("/nope")).toBe(pages[0]);
  });
});

describe("headTags", () => {
  const about = pageMeta("/about");

  it("uses absolute canonical, og:url and og:image when the site URL is known", () => {
    const html = headTags(about, SITE, true);
    expect(html).toContain(`<link rel="canonical" href="${SITE}/about" />`);
    expect(html).toContain(`<meta property="og:url" content="${SITE}/about" />`);
    expect(html).toContain(`<meta property="og:image" content="${SITE}/og-image.png" />`);
    expect(html).not.toContain("noindex");
  });

  it("leaves URLs out rather than guessing when the site URL is unknown", () => {
    const html = headTags(about, "", true);
    expect(html).not.toContain("canonical");
    expect(html).not.toContain("og:url");
  });

  it("marks preview deployments noindex", () => {
    expect(headTags(about, SITE, false)).toContain('<meta name="robots" content="noindex, nofollow" />');
  });

  it("escapes text for HTML attributes", () => {
    expect(headTags(about, SITE, true)).toContain("Education &amp; Skills");
  });
});

describe("robots.txt and sitemap", () => {
  it("allows crawling in production and points to the sitemap", () => {
    expect(robotsTxt(SITE, true)).toContain(`Sitemap: ${SITE}/sitemap.xml`);
    expect(robotsTxt(SITE, true)).toContain("Allow: /");
  });

  it("blocks crawling of previews", () => {
    expect(robotsTxt(SITE, false)).toContain("Disallow: /");
  });

  it("lists every page", () => {
    const xml = sitemapXml(SITE);
    for (const p of pages) expect(xml).toContain(`<loc>${SITE}${p.path}</loc>`);
  });
});

describe("structured data", () => {
  it("links public profiles but never the email address", () => {
    const person = personJsonLd(SITE);
    expect(person.name).toBe("Mete Ünal");
    expect(person.sameAs).toContain("https://github.com/catlaqtr");
    expect(JSON.stringify(person)).not.toContain("mailto:");
  });
});

describe("siteSettings", () => {
  it("uses Vercel's production domain and marks previews noindex", () => {
    expect(siteSettings({ VERCEL_ENV: "production", VERCEL_PROJECT_PRODUCTION_URL: "me.vercel.app" }))
      .toEqual({ siteUrl: "https://me.vercel.app", indexable: true });
    expect(siteSettings({ VERCEL_ENV: "preview", VERCEL_PROJECT_PRODUCTION_URL: "me.vercel.app" }).indexable).toBe(false);
  });

  it("lets SITE_URL override it and trims trailing slashes", () => {
    expect(siteSettings({ SITE_URL: "https://custom.dev/", VERCEL_PROJECT_PRODUCTION_URL: "me.vercel.app" }).siteUrl)
      .toBe("https://custom.dev");
  });

  it("knows nothing locally", () => {
    expect(siteSettings({}).siteUrl).toBe("");
  });
});
