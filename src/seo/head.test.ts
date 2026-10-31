import { describe, expect, it } from "vitest";
import { pages, pageMeta } from "../content/seo";
import { headTags, personJsonLd, robotsTxt, sitemapXml } from "./head";
import { LEGACY_HOSTS, PRODUCTION_URL, siteSettings } from "../../scripts/site.mjs";
import vercel from "../../vercel.json";

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
  it("points every build at the official www domain", () => {
    expect(PRODUCTION_URL).toBe("https://www.meteunal.dev");
    expect(siteSettings({}).siteUrl).toBe("https://www.meteunal.dev");
    expect(siteSettings({ VERCEL_ENV: "production" }).siteUrl).toBe("https://www.meteunal.dev");
    expect(siteSettings({ VERCEL_ENV: "preview" }).siteUrl).toBe("https://www.meteunal.dev");
  });

  it("indexes production but not previews", () => {
    expect(siteSettings({ VERCEL_ENV: "production" }).indexable).toBe(true);
    expect(siteSettings({ VERCEL_ENV: "preview" }).indexable).toBe(false);
  });

  it("lets SITE_URL override it and trims trailing slashes", () => {
    expect(siteSettings({ SITE_URL: "https://custom.dev/" }).siteUrl).toBe("https://custom.dev");
  });
});

describe("canonical URLs on the official domain", () => {
  const { siteUrl } = siteSettings({ VERCEL_ENV: "production" });

  it("every page's canonical, og:url and twitter image use https://www.meteunal.dev", () => {
    for (const page of pages) {
      const html = headTags(page, siteUrl, true);
      expect(html, page.path).toContain(`<link rel="canonical" href="https://www.meteunal.dev${page.path}" />`);
      expect(html, page.path).toContain(`<meta property="og:url" content="https://www.meteunal.dev${page.path}" />`);
      expect(html, page.path).toContain(`<meta name="twitter:image" content="https://www.meteunal.dev/og-image.png" />`);
      expect(html, page.path).not.toMatch(/vercel\.app|\/\/meteunal\.dev/);
    }
  });

  it("sitemap, robots.txt and structured data use the www domain", () => {
    expect(sitemapXml(siteUrl)).not.toMatch(/vercel\.app|\/\/meteunal\.dev/);
    expect(robotsTxt(siteUrl, true)).toContain("Sitemap: https://www.meteunal.dev/sitemap.xml");
    expect(personJsonLd(siteUrl).url).toBe("https://www.meteunal.dev/");
  });
});

describe("vercel.json redirects", () => {
  const redirects = vercel.redirects;
  const productionHost = new URL(PRODUCTION_URL).host;

  it("permanently redirects every old Vercel address to the same path on the official domain", () => {
    for (const host of LEGACY_HOSTS) {
      const rule = redirects.find((r) => r.has?.some((h) => h.type === "host" && h.value === host));
      expect(rule, host).toBeDefined();
      expect(rule!.source).toBe("/:path*");
      expect(rule!.destination).toBe(`${PRODUCTION_URL}/:path*`);
      expect(rule!.permanent).toBe(true);
    }
  });

  it("never redirects the official domain itself (no loops) and only matches specific hosts", () => {
    for (const r of redirects) {
      expect(r.has?.length, "every redirect is host-scoped").toBeGreaterThan(0);
      for (const h of r.has ?? []) expect(h.value).not.toBe(productionHost);
    }
  });
});
