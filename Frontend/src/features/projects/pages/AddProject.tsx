import { useState } from "react";
import { createProject } from "../api/projectApi";
import { uploadImage } from "../../upload/api/uploadApi";
import AdminLayout from "../../../layouts/AdminLayout";
import { ArrowLeft, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    thumbnail: "",
    technologies: "",
    category: "Full Stack",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    status: "completed",
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    setUploading(true);

    const imageUrl = await uploadImage(file);

    setForm((prev) => ({
      ...prev,
      thumbnail: imageUrl,
    }));
  } catch (error) {
    console.error("Image upload failed:", error);
    alert("Image upload failed");
  } finally {
    setUploading(false);
  }
};

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      await createProject({
        ...form,
        technologies: form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      alert("Project added successfully");
      navigate("/admin/projects");
    } catch (err) {
      alert("Failed to create project");
    } finally {
      setSaving(false);
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
          Add New Project
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Create a new work item to display in your public portfolio.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 md:grid-cols-2"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Project Title
            </label>
            <input
              name="title"
              placeholder="e.g. Modern E-commerce Platform"
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
              placeholder="e.g. modern-ecommerce-platform"
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
              placeholder="e.g. A brief single-line summary of the project"
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
              placeholder="Explain the project scope, architecture, challenges and solutions..."
              onChange={handleChange}
              rows={5}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Project Category
            </label>
            <select
              name="category"
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
              Thumbnail Upload
            </label>
            <div className="flex items-center gap-3">
              <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900/50">
                <Upload size={16} />
                {uploading ? "Uploading..." : "Choose Image File"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {form.thumbnail && (
            <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900/30">
              <img
                src={form.thumbnail}
                alt="Thumbnail Preview"
                className="h-32 w-full rounded-lg object-cover"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Or Thumbnail URL
            </label>
            <input
              name="thumbnail"
              value={form.thumbnail}
              placeholder="https://example.com/image.png"
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
              placeholder="React, Node.js, MongoDB, Tailwind"
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
                placeholder="https://github.com/your-username/repo"
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
                placeholder="https://your-project.vercel.app"
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
          {saving ? "Saving Project..." : "Add Project"}
        </button>
      </form>
    </AdminLayout>
  );
}