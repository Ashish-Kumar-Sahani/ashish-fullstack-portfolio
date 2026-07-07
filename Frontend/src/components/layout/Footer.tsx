import { Mail, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white py-12 dark:border-slate-800/60 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-slate-100 pb-8 dark:border-slate-800/40 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-650 bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm">
              <Sparkles size={14} />
            </div>
            <span className="font-extrabold tracking-tight text-slate-900 dark:text-white">
              Ashish Kumar
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50 text-slate-500 transition hover:border-violet-500 hover:text-violet-600 dark:border-slate-850 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-violet-400 dark:hover:text-violet-400"
            >
              <FaGithub size={16} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50 text-slate-500 transition hover:border-violet-500 hover:text-violet-600 dark:border-slate-850 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-violet-400 dark:hover:text-violet-400"
            >
              <FaLinkedin size={16} />
            </a>

            <a
              href="#contact"
              aria-label="Contact Email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50 text-slate-500 transition hover:border-violet-500 hover:text-violet-600 dark:border-slate-850 dark:bg-slate-900/40 dark:text-slate-400 dark:hover:border-violet-400 dark:hover:text-violet-400"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Ashish Kumar. All rights reserved. Created with React, TypeScript and Tailwind.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Designing premium solutions since 2024.
          </p>
        </div>
      </div>
    </footer>
  );
}