import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Briefcase,
  PlusCircle,
  Code2,
  Cpu,
  GraduationCap,
  History,
  Mail,
  Users,
  Settings,
  LogOut,
  Sparkles
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Profile", path: "/admin/profile", icon: User },
  { name: "Projects", path: "/admin/projects", icon: Briefcase },
  { name: "Add Project", path: "/admin/projects/add", icon: PlusCircle },
  { name: "Skills", path: "/admin/skills", icon: Code2 },
  { name: "Services", path: "/admin/services", icon: Cpu },
  { name: "Education", path: "/admin/educations", icon: GraduationCap },
  { name: "Experience", path: "/admin/experiences", icon: History },
  { name: "Messages", path: "/admin/messages", icon: Mail },
  { name: "Visitors", path: "/admin/visitors", icon: Users },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    window.location.href = "/admin/login";
  };

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-slate-200 bg-slate-950 p-6 text-slate-400 transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 md:flex">
      {/* Brand Logo */}
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-500/30">
          <Sparkles size={20} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight leading-none">
            Portfolio Admin
          </h1>
          <span className="text-xs text-violet-400 font-medium">SaaS Console v1.0</span>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
              }`}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-slate-400 group-hover:text-slate-100"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout button at bottom */}
      <div className="mt-auto border-t border-slate-900 pt-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-rose-400 transition-all duration-200 hover:bg-rose-950/30 hover:text-rose-300"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}