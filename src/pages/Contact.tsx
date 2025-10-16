import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function Contact() {
  return (
    <div className="px-6 py-20 max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-extrabold text-white mb-4">Contact Me</h2>
      <p className="text-slate-300 mb-10">
        I’d love to connect! Feel free to reach out through any of the platforms
        below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="mailto:meteunal46@hotmail.com"
          className="group rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200 hover:border-blue-600 hover:shadow-lg transition-all"
        >
          <div className="flex flex-col items-center gap-3">
            <FaEnvelope className="w-7 h-7 text-blue-500" />
            <div className="text-sm text-slate-400 group-hover:text-slate-200">
              Email
            </div>
            <div className="font-medium break-all">meteunal46@hotmail.com</div>
          </div>
        </a>

        <a
          href="https://github.com/catlaqtr"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200 hover:border-blue-600 hover:shadow-lg transition-all"
        >
          <div className="flex flex-col items-center gap-3">
            <FaGithub className="w-7 h-7" />
            <div className="text-sm text-slate-400 group-hover:text-slate-200">
              GitHub
            </div>
            <div className="font-medium">github.com/catlaqtr</div>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/mete-unal-b144b733b/"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200 hover:border-blue-600 hover:shadow-lg transition-all"
        >
          <div className="flex flex-col items-center gap-3">
            <FaLinkedin className="w-7 h-7 text-blue-500" />
            <div className="text-sm text-slate-400 group-hover:text-slate-200">
              LinkedIn
            </div>
            <div className="font-medium">linkedin.com/meteunal</div>
          </div>
        </a>

        <a
          href="https://www.instagram.com/meteunal4646"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200 hover:border-blue-600 hover:shadow-lg transition-all"
        >
          <div className="flex flex-col items-center gap-3">
            <FaInstagram className="w-7 h-7" />
            <div className="text-sm text-slate-400 group-hover:text-slate-200">
              Instagram
            </div>
            <div className="font-medium">@meteunal4646</div>
          </div>
        </a>

        <a
          href="https://leetcode.com/u/catlaqtr/"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200 hover:border-blue-600 hover:shadow-lg transition-all"
        >
          <div className="flex flex-col items-center gap-3">
            <SiLeetcode className="w-7 h-7" />
            <div className="text-sm text-slate-400 group-hover:text-slate-200">
              LeetCode
            </div>
            <div className="font-medium">leetcode.com/u/catlaqtr</div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Contact;
