import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/authApi";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const data = await loginAdmin(form);

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data));

      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-900">
          Admin Login
        </h1>

        <p className="mb-6 text-center text-sm text-slate-500">
          Login to manage your portfolio
        </p>

        {error && (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="mb-4 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-600 text-slate-900 "
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-6 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-600 text-slate-900 "
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* <p className="mt-5 text-center text-sm text-slate-600">
          Don&apos;t have account?{" "}
          <Link to="/admin/register" className="font-semibold text-violet-600">
            Register
          </Link>
        </p> */}
      </form>
    </div>
  );
}