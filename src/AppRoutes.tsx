import { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
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

/** All routes, shared by the browser app and the build-time pre-renderer. */
function AppRoutes() {
  return (
    <>
      <PageHead />
      <Routes>
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
      </Routes>
    </>
  );
}

export default AppRoutes;
