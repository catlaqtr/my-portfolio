import { contactLinks, isExternal, resume } from "../content/contact";
import { profile } from "../content/about";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800/60 bg-slate-900/60">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} {profile.name}
        </div>
        <div className="flex items-center gap-5 text-slate-300">
          {contactLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              {...(isExternal(link) && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              className="hover:text-white transition-colors"
              aria-label={link.label}
            >
              <link.icon aria-hidden="true" className="w-5 h-5" />
            </a>
          ))}
          <a
            href={resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {resume.label}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
