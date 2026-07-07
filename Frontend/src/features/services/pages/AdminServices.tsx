import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import {
  createService,
  deleteService,
  getServices,
} from "../api/serviceApi";
import { PlusCircle, Trash2, Cpu, AlertCircle } from "lucide-react";

type Service = {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    icon: "",
    description: "",
    features: "",
    displayOrder: 1,
  });

  const loadServices = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getServices();
      setServices(data || []);
    } catch {
      setError("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createService({
        ...form,
        displayOrder: Number(form.displayOrder),
        features: form.features
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      setForm({
        title: "",
        icon: "",
        description: "",
        features: "",
        displayOrder: 1,
      });

      loadServices();
    } catch {
      alert("Failed to add service");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete service?")) return;

    try {
      await deleteService(id);
      loadServices();
    } catch {
      alert("Failed to delete service");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Manage Services
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Define services you offer along with core highlights and key capabilities.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Create Service Panel */}
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 lg:col-span-1 space-y-4"
        >
          <h2 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
            <PlusCircle size={18} className="text-violet-500" />
            Add New Service
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Service Title
            </label>
            <input
              placeholder="e.g. Custom Web Development"
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Icon Class or Identifier
            </label>
            <input
              placeholder="e.g. Globe, Cpu, Layout"
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              value={form.icon}
              onChange={(e) =>
                setForm({ ...form, icon: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Service Description
            </label>
            <textarea
              placeholder="Describe your expertise and service deliverable..."
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Key Features (comma separated)
            </label>
            <input
              placeholder="e.g. Responsive design, SEO optimized, Fast API"
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              value={form.features}
              onChange={(e) =>
                setForm({
                  ...form,
                  features: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Display Order
            </label>
            <input
              type="number"
              min="1"
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              value={form.displayOrder}
              onChange={(e) =>
                setForm({
                  ...form,
                  displayOrder: Number(e.target.value),
                })
              }
            />
          </div>

          <button className="w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700">
            Add Service
          </button>
        </form>

        {/* Services Catalog Directory */}
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
                <p className="mt-4 text-xs font-semibold">Loading services catalog...</p>
              </div>
            ) : services.length === 0 ? (
              <p className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">No services offered yet.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-1">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-xl border border-slate-100 p-5 transition hover:border-violet-500/20 dark:border-slate-800 dark:bg-slate-900/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/10 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 mt-1">
                        <Cpu size={20} />
                      </div>
                      
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {service.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xl">
                          {service.description}
                        </p>
                        
                        {service.features && service.features.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {service.features.map((feat) => (
                              <span
                                key={feat}
                                className="rounded-full bg-slate-50 border border-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                              >
                                ✓ {feat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(service._id)}
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