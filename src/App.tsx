import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Title from "./pages/Title";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Phaser is only downloaded when someone enters the village.
const Play = lazy(() => import("./pages/Play"));

function ClassicLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-slate-100">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
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
            <Suspense
              fallback={
                <div className="fixed inset-0 grid place-items-center bg-[#2d4a26] text-[#f4d29c]">
                  Loading the village…
                </div>
              }
            >
              <Play />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
