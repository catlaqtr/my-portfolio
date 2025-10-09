import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl md:text-2xl font-extrabold text-white">
          Mete Ünal
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "text-white bg-blue-600"
                  : "text-slate-200 hover:text-white"
              }`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "text-white bg-blue-600"
                  : "text-slate-200 hover:text-white"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "text-white bg-blue-600"
                  : "text-slate-200 hover:text-white"
              }`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "text-white bg-blue-600"
                  : "text-slate-200 hover:text-white"
              }`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:bg-slate-800"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
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

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-slate-800/60 bg-slate-900/95">
          <div className="px-4 py-3 flex flex-col gap-2">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-white bg-blue-600"
                    : "text-slate-200 hover:text-white"
                }`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-white bg-blue-600"
                    : "text-slate-200 hover:text-white"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/projects"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-white bg-blue-600"
                    : "text-slate-200 hover:text-white"
                }`
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-white bg-blue-600"
                    : "text-slate-200 hover:text-white"
                }`
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
