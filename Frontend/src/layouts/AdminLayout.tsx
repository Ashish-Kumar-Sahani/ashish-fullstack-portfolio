import { useState } from "react";
import Sidebar from "../components/layout/AdminSidebar";
import Topbar from "../components/layout/AdminTopbar";
import { X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-50">
      {/* Desktop Sidebar (Fixed) */}
      <Sidebar />

      {/* Mobile Sidebar Overlay Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={toggleSidebar}
          />

          {/* Drawer Content */}
          <div className="relative flex w-64 flex-col bg-slate-950 p-6 text-slate-400 dark:bg-slate-950">
            {/* Close Button */}
            <button
              onClick={toggleSidebar}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-900 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Brand Logo */}
            <div className="mb-8 flex items-center gap-2 px-2 pt-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight leading-none">
                  Portfolio Admin
                </h1>
                <span className="text-xs text-violet-400 font-medium">SaaS Console</span>
              </div>
            </div>

            {/* Duplicate Menu Items inside Mobile View for simplicity */}
            <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
              {[
                { name: "Dashboard", path: "/admin/dashboard" },
                { name: "Profile", path: "/admin/profile" },
                { name: "Projects", path: "/admin/projects" },
                { name: "Add Project", path: "/admin/projects/add" },
                { name: "Skills", path: "/admin/skills" },
                { name: "Services", path: "/admin/services" },
                { name: "Education", path: "/admin/educations" },
                { name: "Experience", path: "/admin/experiences" },
                { name: "Messages", path: "/admin/messages" },
                { name: "Visitors", path: "/admin/visitors" },
                { name: "Settings", path: "/admin/settings" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={toggleSidebar}
                  className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-900 hover:text-slate-100"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-col min-h-screen md:pl-64">
        <Topbar onMenuToggle={toggleSidebar} />
        
        <main className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}