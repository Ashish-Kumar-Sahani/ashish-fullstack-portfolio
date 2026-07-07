import { useEffect, useState } from "react";
import { getProjects } from "../../../projects/api/projectApi";
import { ArrowUpRight, ExternalLink, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

type Project = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;
  technologies: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  status: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    getProjects().then((data) => setProjects(data || [])).catch(console.error);
  }, []);

  const categories = ["all", ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category?.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section
      id="projects"
      className="bg-slate-50 px-6 py-24 dark:bg-slate-900/40 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Portfolio Showcase
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Featured Work
          </h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            A list of commercial systems, open-source projects, and full-stack solutions.
          </p>
        </div>

        {/* Category Chips */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  activeFilter === cat
                    ? "bg-violet-600 text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-650 hover:bg-slate-55 dark:bg-slate-850 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <p className="text-center py-12 text-sm text-slate-500">No projects added yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-250 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60"
              >
                {/* Image Wrap */}
                <div className="relative h-52 overflow-hidden border-b border-slate-100 dark:border-slate-850">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-50 dark:bg-slate-850">
                      <FolderGit2 size={32} className="text-slate-300 dark:text-slate-700" />
                    </div>
                  )}

                  {/* Badges on Thumbnail */}
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-violet-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                        ★ Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Box */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Technology Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-550 dark:bg-slate-800 dark:border-slate-700/60 dark:text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60">
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="View Repository"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-violet-500 hover:text-violet-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-violet-400"
                        >
                          <FaGithub size={14} />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="View Deployment"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-violet-500 hover:text-violet-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-violet-400"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>

                    {project.slug && (
                      <a
                        href={`/project/${project.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-500 dark:text-violet-455"
                      >
                        Details
                        <ArrowUpRight size={13} />
                      </a>
                    )}
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