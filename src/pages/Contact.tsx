import { FaFileAlt } from "react-icons/fa";
import { contactLinks, isExternal, resume, type ContactLink } from "../content/contact";

// Email and LinkedIn icons have always been tinted blue on this page.
const tintedIcons: ReadonlySet<ContactLink["id"]> = new Set(["email", "linkedin"]);

function Contact() {
  return (
    <div className="px-6 py-20 max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-white mb-4">Contact Me</h1>
      <p className="text-slate-300 mb-10">
        I’d love to connect! Feel free to reach out through any of the platforms
        below.
      </p>

      <a
        href={resume.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 inline-flex items-center gap-3 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        <FaFileAlt aria-hidden="true" /> Download my resume (PDF)
      </a>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contactLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            {...(isExternal(link) && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
            className="group rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200 hover:border-blue-600 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col items-center gap-3">
              <link.icon
                aria-hidden="true"
                className={`w-7 h-7 ${tintedIcons.has(link.id) ? "text-blue-500" : ""}`}
              />
              <div className="text-sm text-slate-400 group-hover:text-slate-200">
                {link.label}
              </div>
              <div className="font-medium break-all">{link.handle}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Contact;
