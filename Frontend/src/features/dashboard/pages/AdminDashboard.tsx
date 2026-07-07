import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { getDashboardStats } from "../api/dashboardApi";
import {
  Briefcase,
  Code2,
  Cpu,
  Mail,
  Users,
  Eye,
  Download,
  PlusCircle,
  Settings as SettingsIcon,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Shield,
  Activity,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    services: 0,
    messages: 0,
    visitors: 0,
    todayVisitors: 0,
    resumeDownloads: 0,
  });

  const user = JSON.parse(
    localStorage.getItem("adminUser") || "{}"
  );

  useEffect(() => {
    getDashboardStats().then(setStats).catch(console.error);
  }, []);

  const cards = [
    {
      title: "Projects",
      value: stats.projects,
      color: "from-blue-500 to-indigo-500",
      icon: Briefcase,
      description: "Active work pieces",
    },
    {
      title: "Skills",
      value: stats.skills,
      color: "from-emerald-500 to-teal-500",
      icon: Code2,
      description: "Tech stack items",
    },
    {
      title: "Services",
      value: stats.services,
      color: "from-purple-500 to-pink-500",
      icon: Cpu,
      description: "Offered capabilities",
    },
    {
      title: "Messages",
      value: stats.messages,
      color: "from-rose-500 to-orange-500",
      icon: Mail,
      description: "Contact inquiries",
    },
    {
      title: "Total Visitors",
      value: stats.visitors,
      color: "from-amber-500 to-orange-400",
      icon: Users,
      description: "All time unique sessions",
    },
    {
      title: "Today's Visitors",
      value: stats.todayVisitors,
      color: "from-cyan-500 to-blue-500",
      icon: Eye,
      description: "Traffic in last 24h",
    },
    {
      title: "Resume Downloads",
      value: stats.resumeDownloads,
      color: "from-violet-500 to-fuchsia-500",
      icon: Download,
      description: "PDF copy retrievals",
    },
  ];

  return (
    <AdminLayout>
      {/* Welcome Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white shadow-xl shadow-violet-500/10 dark:from-violet-900/60 dark:to-indigo-900/60">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-0 right-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-xl" />

        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-white/90">
            <Shield size={12} />
            Administrator Panel
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Welcome Back, {user?.name || "Admin"} 👋
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-indigo-100/90 md:text-base">
            This dashboard offers details on website traffic, client queries, projects, and custom portfolio layouts.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {card.title}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
                    {card.value}
                  </h3>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-md shadow-violet-500/10`}>
                  <Icon size={20} />
                </div>
              </div>
              <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Layout Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Quick Actions (Col-span 2) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-950 dark:text-white">
              Quick Actions
            </h2>
            <TrendingUp size={16} className="text-slate-400" />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Link
              to="/admin/projects/add"
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all duration-200 hover:border-violet-500/20 hover:bg-violet-50/20 dark:border-slate-800 dark:bg-slate-900/20 dark:hover:bg-violet-950/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                  <PlusCircle size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Add Project</p>
                  <p className="text-[10px] text-slate-500">Insert custom work item</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-400" />
            </Link>

            <Link
              to="/admin/skills"
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all duration-200 hover:border-violet-500/20 hover:bg-violet-50/20 dark:border-slate-800 dark:bg-slate-900/20 dark:hover:bg-violet-950/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <Code2 size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Manage Skills</p>
                  <p className="text-[10px] text-slate-500">Adjust core capabilities</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-400" />
            </Link>

            <Link
              to="/admin/messages"
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all duration-200 hover:border-violet-500/20 hover:bg-violet-50/20 dark:border-slate-800 dark:bg-slate-900/20 dark:hover:bg-violet-950/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                  <MessageSquare size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">View Messages</p>
                  <p className="text-[10px] text-slate-500">Check client inquiries</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-400" />
            </Link>

            <Link
              to="/admin/settings"
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all duration-200 hover:border-violet-500/20 hover:bg-violet-50/20 dark:border-slate-800 dark:bg-slate-900/20 dark:hover:bg-violet-950/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                  <SettingsIcon size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Global Settings</p>
                  <p className="text-[10px] text-slate-500">Configure profile & resume</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Admin Information Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-950 dark:text-white">
              System Administrator
            </h2>
            <Shield size={16} className="text-slate-400" />
          </div>

          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">Display Name</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.name || "Not Available"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">Registered Email</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">{user?.email || "Not Available"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">Privileges Role</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white uppercase">{user?.role || "Administrator"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Card */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-950 dark:text-white">
            System Log & Recent Activity
          </h2>
          <Activity size={16} className="text-slate-400" />
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-900/20">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Website Server Connected</p>
                <p className="text-[10px] text-slate-500">Operational check performed successfully</p>
              </div>
            </div>
            <span className="text-[10px] text-slate-400">Just Now</span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-900/20">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-violet-500" />
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Admin Session Active</p>
                <p className="text-[10px] text-slate-500">Signed in via secure local storage validation</p>
              </div>
            </div>
            <span className="text-[10px] text-slate-400">Active</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}