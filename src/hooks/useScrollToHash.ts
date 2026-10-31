import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router doesn't scroll to `#anchors` on navigation, so deep links
 * like /projects#arcclash (used by the village's Recruiter Mode fallbacks)
 * need this.
 */
export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [hash]);
}
