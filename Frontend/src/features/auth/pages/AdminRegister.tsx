// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerAdmin } from "../api/authApi";

// export default function AdminRegister() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!form.name || !form.email || !form.password) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const data = await registerAdmin(form);

//       localStorage.setItem("adminToken", data.token);
//       localStorage.setItem("adminUser", JSON.stringify(data));

//       navigate("/admin/dashboard");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
//       >
//         <h1 className="mb-2 text-center text-3xl font-bold text-slate-900">
//           Admin Register
//         </h1>

//         <p className="mb-6 text-center text-sm text-slate-500">
//           Create your portfolio admin account
//         </p>

//         {error && (
//           <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
//             {error}
//           </p>
//         )}

//         <input
//           name="name"
//           value={form.name}
//           placeholder="Full Name"
//           onChange={handleChange}
//           className="mb-4 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-600"
//         />

//         <input
//           name="email"
//           type="email"
//           value={form.email}
//           placeholder="Email Address"
//           onChange={handleChange}
//           className="mb-4 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-600"
//         />

//         <input
//           name="password"
//           type="password"
//           value={form.password}
//           placeholder="Password"
//           onChange={handleChange}
//           className="mb-6 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-600"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-400"
//         >
//           {loading ? "Creating Account..." : "Register"}
//         </button>

//         <p className="mt-5 text-center text-sm text-slate-600">
//           Already have account?{" "}
//           <Link to="/admin/login" className="font-semibold text-violet-600">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }