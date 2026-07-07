import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { getProjectBySlug } from "../api/projectApi";
import SEO from "../../../components/common/SEO";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import { FaGithub } from "react-icons/fa";

type Project = {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  status: string;
};

export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getProjectBySlug(slug)
        .then((data) => setProject(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-32">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center py-32 text-center px-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Project Not Found</h2>
          <p className="mt-2 text-sm text-slate-500">The requested project could not be loaded.</p>
          <Link to="/" className="mt-6 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md">
            Return Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white transition-colors duration-300">
      <SEO
        title={`${project.title} | Ashish Kumar`}
        description={project.shortDescription || project.description}
      />
      <Navbar />

      <main className="min-h-screen px-6 py-28 md:py-32">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-550 dark:text-violet-400 mb-8 transition"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* Card Wrapper */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 md:p-8">
            {project.thumbnail && (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="mb-8 max-h-[460px] w-full rounded-2xl object-cover shadow-inner"
              />
            )}

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                {project.category}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-350">
                Status: {project.status}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {project.title}
            </h1>

            {/* Description */}
            <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-850">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 mb-3">
                Project Overview
              </h2>
              <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-455 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                  <Code size={16} />
                  Tech Stack & Integration
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions buttons */}
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-850 flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  <FaGithub size={16} />
                  GitHub Repository
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-755 dark:bg-violet-600 dark:hover:bg-violet-700"
                >
                  <ExternalLink size={16} />
                  Live Deployment
                </a>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}