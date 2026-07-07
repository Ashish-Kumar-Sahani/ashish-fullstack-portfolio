import { useEffect, useState } from "react";
import { getSiteSettings } from "../api/publicApi";
import { User, Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type Settings = {
  fullName: string;
  title: string;
  shortBio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
};

const fallbackSettings: Settings = {
  fullName: "Ashish Kumar",
  title: "Full Stack Developer",
  shortBio: "I create responsive, scalable, and professional web applications using React, TypeScript, TailwindCSS, Node.js and MongoDB.",
  email: "",
  phone: "",
  location: "India",
  github: "",
  linkedin: "",
};

export default function About() {
  const [settings, setSettings] = useState<Settings>(fallbackSettings);

  useEffect(() => {
    getSiteSettings()
      .then((data) => {
        if (data) setSettings({ ...fallbackSettings, ...data });
      })
      .catch(console.error);
  }, []);

  const formatUrl = (url: string) => {
    if (!url) return "#";
    const trimmed = url.trim();
    return trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;
  };

  return (
    <section id="about" className="bg-white px-6 py-24 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            About Me
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Who is Ashish Kumar?
          </h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Here is a summary of my background, contact parameters, and social links.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-12 items-start">
          {/* Bio Description (col-span 7) */}
          <div className="md:col-span-7 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Professional Biography
            </h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-350">
              {settings.shortBio}
            </p>
            
            {/* Social Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              {settings.github && (
                <a
                  href={formatUrl(settings.github)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  <FaGithub size={16} />
                  GitHub Account
                </a>
              )}

              {settings.linkedin && (
                <a
                  href={formatUrl(settings.linkedin)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-755 dark:bg-violet-600 dark:hover:bg-violet-700"
                >
                  <FaLinkedin size={16} />
                  Connect on LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Details Card (col-span 5) */}
          <div className="md:col-span-5 rounded-2xl border border-slate-200/60 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/30">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <User size={18} className="text-violet-500" />
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-55/10 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 mt-0.5">
                  <Briefcase size={15} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Role</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{settings.title}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-55/10 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 mt-0.5">
                  <Mail size={15} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Email</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                    {settings.email ? (
                      <a href={`mailto:${settings.email}`} className="hover:underline hover:text-violet-600">
                        {settings.email}
                      </a>
                    ) : (
                      "Not Configured"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-55/10 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 mt-0.5">
                  <Phone size={15} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {settings.phone || "Not Configured"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-55/10 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 mt-0.5">
                  <MapPin size={15} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{settings.location || "India"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}