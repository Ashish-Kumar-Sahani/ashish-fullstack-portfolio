import { useState } from "react";
import { Moon, Sun, Menu, X, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 transition-all duration-300">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-655 bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20">
            <Sparkles size={16} />
          </div>
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
            Ashish Kumar
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Actions (Toggle & Hire Me) */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-violet-500 hover:text-violet-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 dark:hover:border-violet-400 dark:hover:text-violet-400"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Hire Me button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex rounded-xl bg-gradient-to-r from-violet-600 to-indigo-650 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-600/10 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:from-violet-600 dark:to-indigo-600"
          >
            Hire Me
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 md:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="border-t border-slate-200/50 bg-white/95 py-4 px-6 shadow-xl dark:border-slate-800/50 dark:bg-slate-950/95 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-violet-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-violet-400"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full rounded-xl bg-violet-650 bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-center text-sm font-semibold text-white"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}