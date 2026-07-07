import { useEffect, useState } from "react";
import { getSkills } from "../../../skills/api/skillApi";

type Skill = {
  _id: string;
  name: string;
  category: string;
  level: number;
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    getSkills()
      .then((data) => setSkills(data || []))
      .catch(console.error);
  }, []);

  const categories = ["all", "frontend", "backend", "database", "tools", "cloud"];

  const filteredSkills = activeTab === "all"
    ? skills
    : skills.filter(skill => skill.category?.toLowerCase() === activeTab.toLowerCase());

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "frontend": return "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400";
      case "backend": return "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400";
      case "database": return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400";
      case "tools": return "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400";
      case "cloud": return "bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400";
      default: return "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-350";
    }
  };

  return (
    <section
      id="skills"
      className="bg-slate-50 px-6 py-24 dark:bg-slate-900/40 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Technical Stack
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Technologies I Work With
          </h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            A directory of languages, frameworks, developer tools, and database layers I rely on.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                activeTab === cat
                  ? "bg-violet-600 text-white shadow-md shadow-violet-650/15"
                  : "bg-white border border-slate-200 text-slate-650 hover:bg-slate-55 dark:bg-slate-850 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid List */}
        {filteredSkills.length === 0 ? (
          <p className="text-center py-12 text-sm text-slate-500 dark:text-slate-400">No skills added in this category yet.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill._id}
                className="group rounded-2xl border border-slate-205 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getCategoryColor(skill.category)}`}>
                    {skill.category}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-semibold">Skill Level</span>
                    <span className="text-violet-600 dark:text-violet-400 font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-650 rounded-full transition-all duration-500 group-hover:from-violet-600 group-hover:to-indigo-700"
                      style={{
                        width: `${skill.level}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}