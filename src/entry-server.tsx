import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import AppRoutes from "./AppRoutes";

export { pages } from "./content/seo";
export { headTags, robotsTxt, sitemapXml } from "./seo/head";

/** Renders one route to HTML at build time (used by scripts/prerender.mjs). */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <MotionConfig reducedMotion="user">
          <AppRoutes />
        </MotionConfig>
      </StaticRouter>
    </StrictMode>,
  );
}
