import { useEffect, useState } from "react";
import { downloadResume } from "../../../resume/api/resumeApi";
import { getSiteSettings } from "../api/publicApi";
import { ArrowUpRight, FolderGit2, Download, MessageSquare, Award } from "lucide-react";

type Settings = {
  fullName: string;
  title: string;
  shortBio: string;
  profileImage: string;
  resumeUrl: string;
  heroTitle: string;
  heroDescription: string;
};

const defaultSettings: Settings = {
  fullName: "Ashish Kumar",
  title: "Full Stack Developer",
  shortBio: "I create responsive, scalable, and professional web applications using React, TypeScript, TailwindCSS, Node.js and MongoDB.",
  profileImage: "",
  resumeUrl: "",
  heroTitle: "Building Modern Web Apps With Clean UI",
  heroDescription: "I create responsive, scalable, and professional websites using React, TypeScript, TailwindCSS, Node.js and modern backend technologies.",
};

const techStack = ["React.js", "TypeScript", "TailwindCSS", "Node.js", "MongoDB", "Express"];

export default function Hero() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    getSiteSettings()
      .then((data) => {
        if (data) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(console.error);
  }, []);

  const handleResumeDownload = async () => {
    try {
      const blob = await downloadResume();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Ashish_Kumar_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Resume download failed:", error);
      alert("Resume download failed");
    }
  };

  const initials = settings.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "AK";

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-50 px-6 pt-32 dark:bg-slate-950/20 transition-colors duration-300"
    >
      {/* Visual background gradient accents */}
      <div className="absolute right-[-10%] top-[10%] h-96 w-96 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-900/10" />
      <div className="absolute left-[-10%] bottom-[10%] h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-900/10" />

      {/* Grid Pattern Background overlay */}
      <div className="absolute inset-0 z-0 bg-grid-light opacity-[0.4] dark:bg-grid-dark dark:opacity-[0.2]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        {/* Left column description */}
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-violet-100/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
            {settings.title}
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl leading-tight">
            {settings.heroTitle || "Building Modern Web Apps With Clean UI"}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-350">
            {settings.heroDescription || settings.shortBio}
          </p>

          {/* Tech stack items */}
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Primary Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-755 hover:translate-y-[-1px] dark:bg-violet-600 dark:hover:bg-violet-700"
            >
              View Projects
              <ArrowUpRight size={16} />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-500 hover:text-violet-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-400"
            >
              Contact Me
              <MessageSquare size={16} />
            </a>

            <button
              onClick={handleResumeDownload}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
            >
              <Download size={16} />
              Resume
            </button>
          </div>
        </div>

        {/* Right column card preview */}
        <div className="relative mx-auto w-full max-w-md">
          {/* Decorative frame shadow */}
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 opacity-20 blur-xl" />

          <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="rounded-2xl bg-slate-50 p-6 dark:from-slate-850 dark:to-slate-900 dark:bg-slate-900/50">
              {settings.profileImage ? (
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-800 dark:bg-slate-900 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/10" />
                  <img
                    src={settings.profileImage}
                    alt={settings.fullName}
                    className="relative h-64 md:h-72 lg:h-80 w-full rounded-2xl object-cover object-center"
                  />
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-800 dark:bg-slate-900 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/10" />
                  <div className="relative flex h-64 md:h-72 lg:h-80 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-6xl font-extrabold text-white shadow-inner">
                    {initials}
                  </div>
                </div>
              )}

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {settings.fullName}
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                {settings.title}
              </p>

              {/* Stats dashboard widgets */}
              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-slate-150 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-900">
                  <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400">
                    <Award size={12} />
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    1+ Years
                  </h3>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500">
                    Exp
                  </p>
                </div>

                <div className="rounded-xl border border-slate-150 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-900">
                  <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <FolderGit2 size={12} />
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    5+
                  </h3>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500">
                    Projects
                  </p>
                </div>

                <div className="rounded-xl border border-slate-150 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-900">
                  <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                    <MessageSquare size={12} />
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    Active
                  </h3>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500">
                    Inquiries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}