import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import {
  createEducation,
  deleteEducation,
  getEducations,
  updateEducation,
} from "../api/educationApi";
import { PlusCircle, Trash2, Edit2, GraduationCap, School, AlertCircle } from "lucide-react";

type Education = {
  _id: string;
  educationType: "school" | "college";
  degree: string;
  institution: string;
  boardOrUniversity?: string;
  location?: string;
  startYear: string;
  endYear: string;
  grade?: string;
  description?: string;
};

const initialForm = {
  educationType: "college",
  degree: "",
  institution: "",
  boardOrUniversity: "",
  location: "",
  startYear: "",
  endYear: "",
  grade: "",
  description: "",
  displayOrder: 1,
};

export default function AdminEducations() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEducations = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getEducations();
      setEducations(data || []);
    } catch {
      setError("Failed to fetch education records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEducations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      displayOrder: Number(form.displayOrder),
    };

    try {
      if (editId) {
        await updateEducation(editId, payload);
      } else {
        await createEducation(payload);
      }

      setForm(initialForm);
      setEditId(null);
      loadEducations();
    } catch {
      alert("Failed to save education record");
    }
  };

  const handleEdit = (edu: Education) => {
    setEditId(edu._id);

    setForm({
      educationType: edu.educationType || "college",
      degree: edu.degree || "",
      institution: edu.institution || "",
      boardOrUniversity: edu.boardOrUniversity || "",
      location: edu.location || "",
      startYear: edu.startYear || "",
      endYear: edu.endYear || "",
      grade: edu.grade || "",
      description: edu.description || "",
      displayOrder: 1,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this education?")) return;

    try {
      await deleteEducation(id);
      loadEducations();
    } catch {
      alert("Failed to delete record");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Manage Education
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Maintain details of both your high school and college degrees.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form panel */}
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 lg:col-span-1 space-y-4"
        >
          <h2 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
            <PlusCircle size={18} className="text-violet-500" />
            {editId ? "Edit Education" : "Add Education"}
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              Education Type
            </label>
            <select
              value={form.educationType}
              onChange={(e) =>
                setForm({
                  ...form,
                  educationType: e.target.value,
                  degree: "",
                  boardOrUniversity: "",
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
            >
              <option value="college">College / University</option>
              <option value="school">High School</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              {form.educationType === "school" ? "Grade / Class" : "Degree Program"}
            </label>
            <input
              placeholder={
                form.educationType === "school"
                  ? "e.g. 10th / 12th"
                  : "e.g. B.Tech in Computer Science"
              }
              value={form.degree}
              onChange={(e) => setForm({ ...form, degree: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              Institution Name
            </label>
            <input
              placeholder="e.g. Oxford University"
              value={form.institution}
              onChange={(e) =>
                setForm({ ...form, institution: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              Board / Affiliate University
            </label>
            <input
              placeholder="e.g. CBSE / State University"
              value={form.boardOrUniversity}
              onChange={(e) =>
                setForm({ ...form, boardOrUniversity: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
            />
          </div>

          <div className="grid gap-3 grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                Start Year
              </label>
              <input
                placeholder="2020"
                value={form.startYear}
                onChange={(e) => setForm({ ...form, startYear: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                End Year
              </label>
              <input
                placeholder="2024"
                value={form.endYear}
                onChange={(e) => setForm({ ...form, endYear: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                required
              />
            </div>
          </div>

          <div className="grid gap-3 grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                Percentage / GPA
              </label>
              <input
                placeholder="e.g. 9.2 CGPA"
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                min="1"
                placeholder="1"
                value={form.displayOrder}
                onChange={(e) =>
                  setForm({ ...form, displayOrder: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              Institution Location
            </label>
            <input
              placeholder="e.g. London, UK"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              Course Details / Project highlights
            </label>
            <textarea
              placeholder="Thesis topics, honors or special achievements..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Save Record
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setEditId(null);
                }}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Display panel */}
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
                <p className="mt-4 text-xs font-semibold">Loading records...</p>
              </div>
            ) : educations.length === 0 ? (
              <p className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">No education items recorded yet.</p>
            ) : (
              <div className="space-y-6">
                {educations.map((edu) => (
                  <div
                    key={edu._id}
                    className="flex flex-col gap-4 rounded-xl border border-slate-100 p-5 transition hover:border-violet-500/20 dark:border-slate-800 dark:bg-slate-900/20 md:flex-row md:items-start justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          edu.educationType === "school"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                            : "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400"
                        }`}>
                          {edu.educationType === "school" ? "High School" : "College"}
                        </span>
                        
                        {edu.grade && (
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
                            Grade: {edu.grade}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          {edu.educationType === "school" ? <School size={16} /> : <GraduationCap size={16} />}
                          {edu.degree}
                        </h3>
                        <p className="mt-0.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {edu.institution}
                          {edu.boardOrUniversity && ` • ${edu.boardOrUniversity}`}
                        </p>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Class Timeline: {edu.startYear} - {edu.endYear} {edu.location && ` | ${edu.location}`}
                      </p>

                      {edu.description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                          {edu.description}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 self-end md:self-start">
                      <button
                        onClick={() => handleEdit(edu)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-blue-500 transition hover:bg-blue-50 hover:text-blue-600 dark:border-slate-800 dark:hover:bg-blue-950/20"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(edu._id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-rose-500 transition hover:bg-rose-50 hover:text-rose-600 dark:border-slate-800 dark:hover:bg-rose-950/20"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
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