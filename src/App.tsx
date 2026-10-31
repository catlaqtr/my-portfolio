import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Title from "./pages/Title";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./game/ui/LoadingScreen";
import { loadPlay } from "./pages/playLoader";

// Phaser is only downloaded when someone heads for the village (see playLoader).
const Play = lazy(loadPlay);

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
            <Suspense fallback={<LoadingScreen />}>
              <Play />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
