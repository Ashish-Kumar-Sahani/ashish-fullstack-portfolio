import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { createSkill, deleteSkill, getSkills } from "../api/skillApi";
import { Search, Trash2, AlertCircle, PlusCircle } from "lucide-react";

type Skill = {
  _id: string;
  name: string;
  category: string;
  level: number;
  displayOrder?: number;
};

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    icon: "",
    category: "frontend",
    level: 70,
    displayOrder: 1,
  });

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getSkills();
      setSkills(data || []);
    } catch {
      setError("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch = skill.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || skill.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [skills, search, category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createSkill({
        ...form,
        level: Number(form.level),
        displayOrder: Number(form.displayOrder),
      });

      setForm({
        name: "",
        icon: "",
        category: "frontend",
        level: 70,
        displayOrder: 1,
      });

      loadSkills();
    } catch {
      alert("Failed to add skill");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this skill?")) return;

    try {
      await deleteSkill(id);
      loadSkills();
    } catch {
      alert("Failed to delete skill");
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "frontend": return "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400";
      case "backend": return "bg-purple-50 text-purple-700 dark:bg-purple-950/20 dark:text-purple-400";
      case "database": return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400";
      case "tools": return "bg-orange-50 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400";
      case "cloud": return "bg-sky-50 text-sky-700 dark:bg-sky-950/20 dark:text-sky-400";
      default: return "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Manage Skills
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Insert, search, classify and adjust skill values for core categories.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Add Skill Form */}
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 lg:col-span-1"
        >
          <h2 className="mb-6 text-base font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <PlusCircle size={18} className="text-violet-500" />
            Add New Skill
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Skill Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. React, Docker, Node.js"
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Icon Name (Lucide or CSS class)
              </label>
              <input
                name="icon"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="e.g. react-icon"
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="tools">Tools</option>
                <option value="cloud">Cloud</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid gap-4 grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  Level (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.level}
                  onChange={(e) =>
                    setForm({ ...form, level: Number(e.target.value) })
                  }
                  placeholder="70"
                  className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.displayOrder}
                  onChange={(e) =>
                    setForm({ ...form, displayOrder: Number(e.target.value) })
                  }
                  placeholder="1"
                  className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                />
              </div>
            </div>
          </div>

          <button className="mt-6 w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700">
            Add Skill
          </button>
        </form>

        {/* Skills Directory */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search/Filter bar */}
          <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 sm:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-slate-400" size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search skills..."
                className="w-full rounded-xl border border-slate-200 bg-transparent py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
            >
              <option value="all">All Categories</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
              <option value="tools">Tools</option>
              <option value="cloud">Cloud</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* List display */}
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
                <p className="mt-4 text-xs font-semibold">Loading skills...</p>
              </div>
            ) : filteredSkills.length === 0 ? (
              <p className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">No skills added yet matching filter.</p>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {skill.name}
                        </span>
                        
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(skill.category)}`}>
                          {skill.category}
                        </span>
                      </div>

                      {/* Progress representation */}
                      <div className="flex items-center gap-3 pr-8">
                        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(skill._id)}
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