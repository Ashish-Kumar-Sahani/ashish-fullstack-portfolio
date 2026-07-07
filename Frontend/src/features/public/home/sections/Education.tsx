import { useEffect, useState } from "react";
import { getEducations } from "../../../education/api/educationApi";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

type Education = {
  _id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  grade: string;
  description: string;
  educationType?: string;
};

export default function Education() {
  const [educations, setEducations] = useState<Education[]>([]);

  useEffect(() => {
    getEducations().then((data) => setEducations(data || [])).catch(console.error);
  }, []);

  return (
    <section id="education" className="bg-white px-6 py-24 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Education Timeline
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Academic Background
          </h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            A history of my school certifications, college graduation degrees, and fields of focus.
          </p>
        </div>

        {educations.length === 0 ? (
          <p className="text-center text-sm text-slate-550 dark:text-slate-450 py-12">No academic history records added yet.</p>
        ) : (
          <div className="relative border-l border-slate-200 pl-6 dark:border-slate-800 ml-4 space-y-10">
            {educations.map((edu) => (
              <div key={edu._id} className="relative group">
                {/* Visual Timeline Marker Node */}
                <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border border-slate-200 dark:bg-slate-950 dark:border-slate-800 transition-all group-hover:border-violet-500">
                  <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:bg-violet-600 transition-all" />
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <GraduationCap size={18} className="text-violet-500" />
                        {edu.degree}
                      </h3>
                      
                      <p className="mt-0.5 text-base font-bold text-violet-600 dark:text-violet-405">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-semibold md:text-right md:flex-col md:items-end">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {edu.startYear} - {edu.endYear}
                      </span>
                      {edu.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          {edu.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {edu.grade && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-lg w-fit">
                      <Award size={13} />
                      Grade: {edu.grade}
                    </div>
                  )}

                  {edu.description && (
                    <p className="mt-4 text-sm leading-relaxed text-slate-655 dark:text-slate-350 whitespace-pre-line">
                      {edu.description}
                    </p>
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