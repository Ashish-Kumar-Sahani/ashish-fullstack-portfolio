import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Search, Menu, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";

type TopbarProps = {
  onMenuToggle: () => void;
};

export default function Topbar({ onMenuToggle }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    window.location.href = "/admin/login";
  };

  // Get dynamic page title from route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith("/admin/dashboard")) return "Dashboard Overview";
    if (path.startsWith("/admin/profile")) return "Profile Settings";
    if (path.startsWith("/admin/projects/add")) return "Add New Project";
    if (path.startsWith("/admin/projects/edit")) return "Edit Project Details";
    if (path.startsWith("/admin/projects")) return "Project Directory";
    if (path.startsWith("/admin/skills")) return "Skill Assessment";
    if (path.startsWith("/admin/services")) return "Service Catalog";
    if (path.startsWith("/admin/educations")) return "Academic Records";
    if (path.startsWith("/admin/experiences")) return "Work History";
    if (path.startsWith("/admin/messages")) return "Client Enquiries";
    if (path.startsWith("/admin/settings")) return "Global Settings";
    if (path.startsWith("/admin/visitors")) return "Traffic Analytics";
    return "Admin Panel";
  };

  const user = JSON.parse(localStorage.getItem("adminUser") || "{}");
  const profileImage = user?.profileImage || null;
  const name = user?.name || "Admin User";
  
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "AD";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 md:hidden"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {getPageTitle()}
          </h2>
          <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
            Welcome back, {name}
          </p>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Search Placeholder */}
        <div className="relative hidden w-64 lg:block">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search anything..."
            disabled
            className="w-full rounded-xl border border-slate-200/80 bg-slate-50/50 py-2 pl-10 pr-4 text-xs outline-none cursor-not-allowed dark:border-slate-800 dark:bg-slate-900/50"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:border-violet-500 hover:text-violet-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-violet-400 dark:hover:text-violet-400"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Logout Button (For Quick Topbar Access) */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-rose-500 transition-colors hover:bg-rose-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-rose-950/20"
        >
          <LogOut size={18} />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-slate-800">
          <div className="hidden text-right md:block">
            <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">
              {name}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              {user?.role || "Administrator"}
            </p>
          </div>
          
          {profileImage ? (
            <img
              src={profileImage}
              alt={name}
              className="h-10 w-10 rounded-xl object-cover ring-2 ring-violet-500/20"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 font-bold text-white shadow-md shadow-violet-600/10">
              {initials}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}