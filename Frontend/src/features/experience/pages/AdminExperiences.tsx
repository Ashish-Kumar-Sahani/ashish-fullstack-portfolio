import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import {
  createExperience,
  deleteExperience,
  getExperiences,
} from "../api/experienceApi";
import { PlusCircle, Trash2, Calendar, MapPin, Briefcase, AlertCircle } from "lucide-react";

type Experience = {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  technologies?: string[];
};

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "Present",
    description: "",
    technologies: "",
  });

  const loadExperiences = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getExperiences();
      setExperiences(data || []);
    } catch {
      setError("Failed to fetch experiences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createExperience({
        ...form,
        technologies: form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      setForm({
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "Present",
        description: "",
        technologies: "",
      });

      loadExperiences();
    } catch {
      alert("Failed to add experience");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete experience record?")) return;

    try {
      await deleteExperience(id);
      loadExperiences();
    } catch {
      alert("Failed to delete experience");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Work Experience
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your career history timeline and reference stack information.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Add Experience form */}
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 lg:col-span-1 space-y-4"
        >
          <h2 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
            <PlusCircle size={18} className="text-violet-500" />
            Add Experience
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              Position / Role
            </label>
            <input
              placeholder="e.g. Lead Frontend Developer"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              Company Name
            </label>
            <input
              placeholder="e.g. Google DeepMind"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              Office Location
            </label>
            <input
              placeholder="e.g. London, UK (Remote)"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
            />
          </div>

          <div className="grid gap-3 grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                Start Date
              </label>
              <input
                placeholder="Jan 2024"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                End Date
              </label>
              <input
                placeholder="Present / Dec 2025"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              Technologies Utilized
            </label>
            <input
              placeholder="React, TypeScript, CSS, Node"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              Responsibilities & Accomplishments
            </label>
            <textarea
              placeholder="Summarize key tasks, metrics, scale and tools..."
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
            />
          </div>

          <button className="w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700">
            Add Experience Record
          </button>
        </form>

        {/* Experience List Container */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-950/20 dark:text-rose-400">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
                <p className="mt-4 text-xs font-semibold">Loading experience timeline...</p>
              </div>
            ) : experiences.length === 0 ? (
              <p className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">No experiences listed yet.</p>
            ) : (
              <div className="space-y-6">
                {experiences.map((item) => (
                  <div
                    key={item._id}
                    className="group flex flex-col justify-between gap-4 rounded-xl border border-slate-100 p-5 transition hover:border-violet-500/20 dark:border-slate-800 dark:bg-slate-900/20 md:flex-row md:items-start"
                  >
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Briefcase size={16} className="text-violet-500" />
                          {item.position}
                        </h3>
                        <p className="mt-0.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {item.company}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          {item.startDate} - {item.endDate}
                        </span>
                        {item.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={13} />
                            {item.location}
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                          {item.description}
                        </p>
                      )}

                      {item.technologies && item.technologies.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-slate-50 border border-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-rose-500 transition hover:bg-rose-50 hover:text-rose-600 dark:border-slate-800 dark:hover:bg-rose-950/20"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}