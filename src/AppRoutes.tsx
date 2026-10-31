import { lazy, Suspense } from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Title from "./pages/Title";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageHead from "./components/PageHead";
import LoadingScreen from "./game/ui/LoadingScreen";
import { loadPlay } from "./pages/playLoader";
import { useReduceMotion } from "./hooks/useReduceMotion";
import { frameByFrame } from "./components/frameByFrame";

// Phaser is only downloaded when someone heads for the village (see playLoader).
const Play = lazy(loadPlay);

function ClassicLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-slate-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="pt-20 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

/** The three ways to see the site; moving between them cross-fades. */
const classicPaths = ["/portfolio", "/about", "/projects", "/contact"];
const modeOf = (path: string) => {
  const p = path.replace(/\/+$/, "") || "/";
  if (p === "/play") return "play";
  return classicPaths.includes(p) ? "classic" : "title"; // unknown paths redirect to the title
};

/**
 * All routes, shared by the browser app and the build-time pre-renderer.
 * `initial={false}` renders the first page fully visible (nothing is hidden
 * in the pre-rendered HTML); only later mode changes fade, and instantly
 * with reduced motion.
 */
function AppRoutes() {
  const location = useLocation();
  const reduced = useReduceMotion();

  return (
    <>
      <PageHead />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={modeOf(location.pathname)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2, ease: "easeOut" }}
          onUpdate={frameByFrame}
        >
          <Routes location={location}>
            <Route path="/" element={<Title />} />
            <Route element={<ClassicLayout />}>
              <Route path="/portfolio" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route
              path="/play"
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <Play />
                </Suspense>
              }
            />
            {/* Old or mistyped links land on the title screen instead of a blank page. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default AppRoutes;
