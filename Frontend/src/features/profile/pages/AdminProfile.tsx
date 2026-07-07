import { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { changePassword } from "../../auth/api/authApi";
import { User, Mail, ShieldAlert, KeyRound, CheckCircle2 } from "lucide-react";

export default function AdminProfile() {
  const user = JSON.parse(localStorage.getItem("adminUser") || "{}");

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!form.oldPassword || !form.newPassword) {
      setErrorMsg("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await changePassword(form);
      setSuccessMsg("Password changed successfully");
      setForm({
        oldPassword: "",
        newPassword: "",
      });
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Failed to change password. Please check your old password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Profile</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Manage your administrator password and review account details.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 lg:col-span-1">
          <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User size={18} className="text-violet-500" />
            Account Details
          </h2>

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/20">
              <span className="text-xs text-slate-400 dark:text-slate-500">Name</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{user.name || "Administrator"}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/20">
              <span className="text-xs text-slate-400 dark:text-slate-500">Email Address</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-2 truncate">
                <Mail size={14} className="text-slate-400" />
                {user.email || "N/A"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/20">
              <span className="text-xs text-slate-400 dark:text-slate-500">Privileges Role</span>
              <p className="text-sm font-bold text-violet-600 dark:text-violet-400 mt-0.5 uppercase tracking-wider text-xs">
                {user.role || "Admin"}
              </p>
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 lg:col-span-2"
        >
          <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <KeyRound size={18} className="text-violet-500" />
            Change Password
          </h2>

          {successMsg && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-950/20 dark:text-rose-400">
              <ShieldAlert size={16} />
              {errorMsg}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Old Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.oldPassword}
                onChange={(e) =>
                  setForm({ ...form, oldPassword: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                required
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              disabled={loading}
              className="w-full rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:bg-violet-400 dark:bg-violet-600 dark:hover:bg-violet-700 sm:w-auto"
            >
              {loading ? "Changing Password..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}