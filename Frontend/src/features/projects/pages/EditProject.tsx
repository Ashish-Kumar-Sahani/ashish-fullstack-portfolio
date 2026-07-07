import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectById, updateProject } from "../api/projectApi";
import { uploadImage } from "../../upload/api/uploadApi";
import AdminLayout from "../../../layouts/AdminLayout";
import { ArrowLeft, Upload } from "lucide-react";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingProject, setLoadingProject] = useState(true);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    thumbnail: "",
    technologies: "",
    category: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    status: "completed",
  });

  useEffect(() => {
    if (!id) return;

    setLoadingProject(true);
    getProjectById(id)
      .then((project) => {
        setForm({
          title: project.title || "",
          slug: project.slug || "",
          shortDescription: project.shortDescription || "",
          description: project.description || "",
          thumbnail: project.thumbnail || "",
          technologies: project.technologies?.join(", ") || "",
          category: project.category || "Full Stack",
          githubUrl: project.githubUrl || "",
          liveUrl: project.liveUrl || "",
          featured: project.featured || false,
          status: project.status || "completed",
        });
      })
      .catch(() => {
        alert("Failed to load project details");
      })
      .finally(() => {
        setLoadingProject(false);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    try {
      setSaving(true);
      await updateProject(id, {
        ...form,
        technologies: form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      alert("Project updated successfully");
      navigate("/admin/projects");
    } catch {
      alert("Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const imageUrl = await uploadImage(file);
      setForm((prev) => ({ ...prev, thumbnail: imageUrl }));
    } catch {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
        >
          <ArrowLeft size={14} />
          Back to Project Catalog
        </Link>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
          Edit Project
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Modify the properties and details of your portfolio project.
        </p>
      </div>

      {loadingProject ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="mt-4 text-sm font-medium">Loading project details...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Project Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Slug Identifier
              </label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Short Description
              </label>
              <input
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Detailed Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Design">Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Or Thumbnail File Upload
              </label>
              <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900/50">
                <Upload size={16} />
                {uploading ? "Uploading..." : "Replace Image File"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>

            {form.thumbnail && (
              <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900/30">
                <img
                  src={form.thumbnail}
                  alt="Project Preview"
                  className="h-32 w-full rounded-lg object-cover"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Thumbnail URL
              </label>
              <input
                name="thumbnail"
                value={form.thumbnail}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Technologies (comma separated)
              </label>
              <input
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  GitHub Repository URL
                </label>
                <input
                  name="githubUrl"
                  value={form.githubUrl}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  Live Deployment URL
                </label>
                <input
                  name="liveUrl"
                  value={form.liveUrl}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 items-center">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  Development Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>

              <div className="pt-5">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-slate-200 text-violet-600 focus:ring-violet-500 dark:border-slate-800"
                  />
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Feature in Hero / Highlights
                  </span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading || saving}
            className="w-full rounded-xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:bg-violet-400 md:col-span-2"
          >
            {saving ? "Saving Changes..." : "Update Project"}
          </button>
        </form>
      )}
    </AdminLayout>
  );
}