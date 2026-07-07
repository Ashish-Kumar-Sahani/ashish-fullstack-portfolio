import { useState } from "react";
import { sendContactMessage } from "../../../contact/api/contactApi";
import { Send, CheckCircle2, ShieldAlert } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setErrorMsg("");

    try {
      await sendContactMessage(form);
      setSuccess("Your message has been sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMsg("Something went wrong while sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-slate-50 px-6 py-24 dark:bg-slate-900/40 transition-colors duration-300"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Get In Touch
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Let's Build Something Great
          </h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Have a project in mind, want to hire me, or simply say hello? Send a message below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 md:p-8"
        >
          {success && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              {success}
            </div>
          )}

          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-950/20 dark:text-rose-400">
              <ShieldAlert size={16} />
              {errorMsg}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 mb-2">
                Your Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ashish Kumar"
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 mb-2">
                Your Email Address
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 mb-2">
              Subject
            </label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="e.g. Project Consultation Inquiry"
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 mb-2">
              Message Detail
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Describe your design needs, schedule constraints, or project specifications..."
              rows={5}
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
              required
            />
          </div>

          <button
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-755 hover:translate-y-[-1px] disabled:bg-violet-400 dark:bg-violet-600 dark:hover:bg-violet-700"
          >
            <Send size={15} />
            {loading ? "Sending Enquiry..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}