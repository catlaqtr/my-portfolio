import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800/60 bg-slate-900/60">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} Mete Ünal
        </div>
        <div className="flex items-center gap-5 text-slate-300">
          <a
            href="mailto:meteunal46@hotmail.com"
            className="hover:text-white transition-colors"
            aria-label="Email"
          >
            <FaEnvelope className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/catlaqtr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/mete-unal-b144b733b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/meteunal4646"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href="https://leetcode.com/u/catlaqtr/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LeetCode"
          >
            <SiLeetcode className="w-5 h-5" />
          </a>
          <a
            href="/Mete_Unal_Coop_Resume_Updated.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
