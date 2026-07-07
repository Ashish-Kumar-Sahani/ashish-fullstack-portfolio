import { useEffect, useState } from "react";
import { getExperiences } from "../../../experience/api/experienceApi";
import { Calendar, MapPin, Briefcase } from "lucide-react";

type Experience = {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
};

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    getExperiences()
      .then((data) => setExperiences(data || []))
      .catch(console.error);
  }, []);

  return (
    <section
      id="experience"
      className="bg-slate-50 px-6 py-24 dark:bg-slate-900/40 transition-colors duration-300"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Employment Records
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Work Experience
          </h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            A chronological review of my professional career, technical projects, and roles.
          </p>
        </div>

        {experiences.length === 0 ? (
          <p className="text-center text-sm text-slate-550 dark:text-slate-450 py-12">No work experiences listed yet.</p>
        ) : (
          <div className="relative border-l border-slate-200 pl-6 dark:border-slate-800 ml-4 space-y-10">
            {experiences.map((item) => (
              <div key={item._id} className="relative group">
                {/* Visual Timeline Marker Node */}
                <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border border-slate-200 dark:bg-slate-950 dark:border-slate-800 transition-all group-hover:border-violet-500">
                  <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:bg-violet-600 transition-all" />
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Briefcase size={16} className="text-violet-500" />
                        {item.position}
                      </h3>
                      <p className="mt-0.5 text-base font-bold text-violet-600 dark:text-violet-405">
                        {item.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-semibold md:text-right md:flex-col md:items-end">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {item.startDate} - {item.endDate}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-650 dark:text-slate-350 whitespace-pre-line">
                    {item.description}
                  </p>

                  {/* Tech stack tags */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-slate-50 border border-slate-100 px-3 py-1 text-xs font-semibold text-slate-650 dark:bg-slate-800 dark:border-slate-700/60 dark:text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}