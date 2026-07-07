import { useEffect, useState } from "react";
import { getServices } from "../../../services/api/serviceApi";
import { Check, Cpu, Globe, Layout, Sparkles, Terminal } from "lucide-react";

type Service = {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getServices()
      .then((data) => setServices(data || []))
      .catch(console.error);
  }, []);

  const getServiceIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case "globe": return <Globe size={24} className="text-violet-600 dark:text-violet-400" />;
      case "cpu": return <Cpu size={24} className="text-violet-600 dark:text-violet-400" />;
      case "layout": return <Layout size={24} className="text-violet-600 dark:text-violet-400" />;
      case "terminal": return <Terminal size={24} className="text-violet-600 dark:text-violet-400" />;
      default: return <Sparkles size={24} className="text-violet-600 dark:text-violet-400" />;
    }
  };

  return (
    <section
      id="services"
      className="bg-white px-6 py-24 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Professional Offerings
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            What I Can Do
          </h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            I offer reliable development, clean layout design, database planning, and system deployments.
          </p>
        </div>

        {services.length === 0 ? (
          <p className="text-center text-sm text-slate-550 dark:text-slate-450 py-12">No services added yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service._id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-slate-800/80 dark:bg-slate-900/40"
              >
                <div>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-xl font-bold transition-all duration-300 group-hover:scale-110 dark:bg-violet-950/40">
                    {getServiceIcon(service.icon)}
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-650 dark:text-slate-350">
                    {service.description}
                  </p>
                </div>

                {service.features && service.features.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-450">
                          <Check size={10} />
                        </div>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}