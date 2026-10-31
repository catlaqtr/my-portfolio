import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import PixelButton from "./PixelButton";

const links = [
  { to: "/portfolio", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
const linkClass = ({ isActive }: { isActive: boolean }) =>
  `${linkBase} ${isActive ? "text-white bg-blue-600" : "text-slate-200 hover:text-white"}`;

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto flex justify-between items-center gap-3 px-4 py-3">
        <Link to="/portfolio" className="text-xl md:text-2xl font-extrabold text-white">
          Mete Ünal
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <PixelButton to="/play" variant="primary" className="ml-3">
            <span aria-hidden="true">▶</span> Enter the Village
          </PixelButton>
        </div>

        {/* Mobile: the village button stays visible next to the menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <PixelButton to="/play" variant="primary">
            <span aria-hidden="true">▶</span> Village
          </PixelButton>
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:bg-slate-800"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-slate-800/60 bg-slate-900/95">
          <div className="px-4 py-3 flex flex-col gap-2">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
