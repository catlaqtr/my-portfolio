/**
 * Build step after `vite build`: writes a static HTML file per Recruiter Mode
 * page (real content + its own title, description and Open Graph tags), so
 * search engines and link previews don't depend on JavaScript. Also writes
 * robots.txt and sitemap.xml.
 *
 * Output (dist/):
 *   index.html, portfolio.html, about.html, …  pre-rendered pages
 *   shell.html                                  empty app shell for /play and unknown URLs
 *   robots.txt, sitemap.xml
 */
import { readFile, writeFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { siteSettings } from "./site.mjs";

const dist = resolve("dist");
const ssr = resolve("dist-ssr/entry-server.js");
const { render, pages, headTags, robotsTxt, sitemapXml } = await import(pathToFileURL(ssr).href);
const { siteUrl, indexable } = siteSettings();
const template = await readFile(resolve(dist, "index.html"), "utf8");

const page = (meta, html = "") =>
  template
    .replace("<!--app-head-->", headTags(meta, siteUrl, indexable))
    .replace('<div id="root"><!--app-html--></div>', `<div id="root"${html ? ` data-route="${meta.path}"` : ""}>${html}</div>`);

const fileFor = (path) => (path === "/" ? "index.html" : `${path.slice(1)}.html`);

// The shell carries the village's meta; it's served for /play and anything unknown.
await writeFile(resolve(dist, "shell.html"), page(pages.find((p) => p.path === "/play")));

for (const meta of pages.filter((p) => p.prerender)) {
  await writeFile(resolve(dist, fileFor(meta.path)), page(meta, render(meta.path)));
}

await writeFile(resolve(dist, "robots.txt"), robotsTxt(siteUrl, indexable));
if (siteUrl) await writeFile(resolve(dist, "sitemap.xml"), sitemapXml(siteUrl));
await rm(resolve("dist-ssr"), { recursive: true, force: true });

console.log(
  `prerender: ${pages.filter((p) => p.prerender).length} pages, ` +
    `site URL ${siteUrl || "(unknown — canonical, og:url and sitemap skipped)"}, ` +
    `${indexable ? "indexable" : "noindex (preview)"}`,
);
