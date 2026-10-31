import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL, pageMeta } from "../content/seo";

function setMeta(selector: string, attr: "content" | "href", value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Keeps the document title, description, canonical URL and Open Graph tags
 * in step with the current route. (Pre-rendered pages already ship with
 * these in their HTML; this covers in-app navigation.)
 */
function PageHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = pageMeta(pathname);
    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[name="twitter:title"]', "content", meta.title);
    setMeta('meta[name="twitter:description"]', "content", meta.description);
    if (SITE_URL) {
      setMeta('meta[property="og:url"]', "content", SITE_URL + meta.path);
      setMeta('link[rel="canonical"]', "href", SITE_URL + meta.path);
    }
  }, [pathname]);

  return null;
}

export default PageHead;
