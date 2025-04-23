import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

function Contact() {
  return (
    <div className="px-6 py-20 max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-blue-600 mb-6">Contact Me</h2>
      <p className="text-gray-700 mb-12">
        I'd love to connect! Feel free to reach out through any of the platforms
        below.
      </p>

      <div className="space-y-6">
        <a
          href="mailto:meteunal46@hotmail.com"
          className="flex items-center justify-center gap-3 text-gray-800 hover:text-blue-600 transition"
        >
          <FaEnvelope className="w-6 h-6" />
          meteunal46@hotmail.com
        </a>

        <a
          href="https://github.com/catlaqtr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 text-gray-800 hover:text-blue-600 transition"
        >
          <FaGithub className="w-6 h-6" />
          github.com/catlaqtr
        </a>

        <a
          href="https://www.linkedin.com/in/mete-unal-b144b733b/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 text-gray-800 hover:text-blue-600 transition"
        >
          <FaLinkedin className="w-6 h-6" />
          linkedin.com/meteunal
        </a>
      </div>
    </div>
  );
}

export default Contact;
