import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProject, getProjects } from "../api/projectApi";
import AdminLayout from "../../../layouts/AdminLayout";
import { Search, Plus, Trash2, Edit2, AlertCircle } from "lucide-react";

type Project = {
  _id: string;
  title: string;
  category: string;
  status: string;
  featured: boolean;
  shortDescription: string;
  thumbnail: string;
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 6;

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      setError("Failed to fetch projects. Please reload.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = status === "all" || project.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, status]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(id);
      loadProjects();
    } catch {
      alert("Failed to delete project");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Project Catalog
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Search, filter, view, edit and delete your portfolio projects.
          </p>
        </div>

        <Link
          to="/admin/projects/add"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          <Plus size={16} />
          Add Project
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 md:grid-cols-12 md:items-center">
        <div className="relative md:col-span-6">
          <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search projects by title..."
            className="w-full rounded-xl border border-slate-200 bg-transparent py-3 pl-10 pr-4 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
          />
        </div>

        <div className="relative md:col-span-3">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="planned">Planned</option>
          </select>
        </div>

        <div className="flex h-11 items-center justify-center rounded-xl bg-slate-50 px-4 font-semibold text-slate-600 dark:bg-slate-900/40 dark:text-slate-400 md:col-span-3">
          Total Found: {filteredProjects.length}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mt-8 flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-950/20 dark:text-rose-400">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Grid List */}
      {loading ? (
        <div className="mt-12 flex flex-col items-center justify-center py-12 text-slate-500">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="mt-4 text-sm">Fetching catalog...</p>
        </div>
      ) : paginatedProjects.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900/20">
          <p className="text-sm text-slate-500 dark:text-slate-400">No projects match the selected criteria.</p>
          <Link
            to="/admin/projects/add"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
          >
            Create one now &rarr;
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProjects.map((project) => (
            <div
              key={project._id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40"
            >
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-44 w-full object-cover border-b border-slate-100 dark:border-slate-800"
                />
              ) : (
                <div className="flex h-44 w-full items-center justify-center bg-slate-50 dark:bg-slate-900">
                  <p className="text-xs text-slate-400">No thumbnail preview</p>
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {project.category}
                  </span>
                  
                  {/* Status Badge */}
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                      project.status === "completed"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                        : project.status === "in-progress"
                        ? "bg-sky-50 text-sky-700 dark:bg-sky-950/20 dark:text-sky-400"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                  {project.title}
                </h3>
                
                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                  {project.shortDescription || "No short description provided."}
                </p>

                {project.featured && (
                  <div className="mt-3">
                    <span className="inline-flex rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                      ★ Featured Project
                    </span>
                  </div>
                )}

                <div className="mt-auto pt-5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to={`/admin/projects/edit/${project._id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400"
                  >
                    <Edit2 size={12} />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(project._id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-500 dark:text-rose-400"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent dark:border-slate-800 dark:hover:bg-slate-900"
          >
            Prev
          </button>

          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent dark:border-slate-800 dark:hover:bg-slate-900"
          >
            Next
          </button>
        </div>
      )}
    </AdminLayout>
  );
}