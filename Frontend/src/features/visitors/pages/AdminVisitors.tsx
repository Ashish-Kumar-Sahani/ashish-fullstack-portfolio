import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AdminLayout from "../../../layouts/AdminLayout";
import { getVisitorStats } from "../api/visitorApi";
import { Users, Globe, Eye, Laptop, Smartphone, AlertCircle } from "lucide-react";

type Visitor = {
  _id: string;
  ipAddress: string;
  country: string;
  city: string;
  browser: string;
  os: string;
  device: string;
  page: string;
  createdAt: string;
};

export default function AdminVisitors() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getVisitorStats();
      setStats(data);
    } catch {
      setError("Failed to fetch traffic metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="mt-4 text-sm font-medium">Fetching visitor logs...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error || !stats) {
    return (
      <AdminLayout>
        <div className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-950/20 dark:text-rose-400">
          <AlertCircle size={16} />
          {error || "An unexpected error occurred loading traffic logs."}
        </div>
      </AdminLayout>
    );
  }

  const countryChartData = stats.topCountries.map((item: any) => ({
    country: item._id || "Unknown",
    visitors: item.count,
  }));

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Traffic Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Monitor unique sessions, country origins, device allocations, and routes.
        </p>
      </div>

      {/* Summary widgets */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Visitors</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400">
              <Users size={16} />
            </div>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {stats.totalVisitors}
          </h2>
          <p className="mt-1.5 text-[10px] text-slate-500">Accumulated unique IPs</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Top Origin Country</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <Globe size={16} />
            </div>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
            {stats.topCountries?.[0]?._id || "Unknown"}
          </h2>
          <p className="mt-1.5 text-[10px] text-slate-500">Highest session generation</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Unique Pages Visited</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <Eye size={16} />
            </div>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {stats.recentVisits?.length || 0}
          </h2>
          <p className="mt-1.5 text-[10px] text-slate-500">Recent session views logged</p>
        </div>
      </div>

      {/* Chart container */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
        <h2 className="mb-6 text-base font-bold text-slate-900 dark:text-white">
          Demographics (Origin Sessions)
        </h2>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={countryChartData}>
              <XAxis dataKey="country" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#ffffff"
                }}
              />
              <Bar dataKey="visitors" fill="#6d28d9" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table container */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
        <div className="border-b border-slate-100 px-6 py-5 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent Session Logs</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 dark:border-slate-800 dark:bg-slate-900/30">
                <th className="px-6 py-3.5 font-bold uppercase tracking-wider">Page Route</th>
                <th className="px-6 py-3.5 font-bold uppercase tracking-wider">Country</th>
                <th className="px-6 py-3.5 font-bold uppercase tracking-wider">City</th>
                <th className="px-6 py-3.5 font-bold uppercase tracking-wider">Browser</th>
                <th className="px-6 py-3.5 font-bold uppercase tracking-wider">Device</th>
                <th className="px-6 py-3.5 font-bold uppercase tracking-wider">Session Time</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {stats.recentVisits.map((visit: Visitor) => (
                <tr key={visit._id} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/10">
                  <td className="px-6 py-3.5 font-semibold text-slate-900 dark:text-white">
                    {visit.page || "/"}
                  </td>
                  <td className="px-6 py-3.5 text-slate-600 dark:text-slate-400">
                    {visit.country || "Unknown"}
                  </td>
                  <td className="px-6 py-3.5 text-slate-600 dark:text-slate-400">
                    {visit.city || "Unknown"}
                  </td>
                  <td className="px-6 py-3.5 text-slate-600 dark:text-slate-400">
                    {visit.browser || "Unknown"}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400">
                      {visit.device?.toLowerCase() === "mobile" ? <Smartphone size={13} /> : <Laptop size={13} />}
                      {visit.device || "Desktop"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-slate-500 dark:text-slate-500">
                    {new Date(visit.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}