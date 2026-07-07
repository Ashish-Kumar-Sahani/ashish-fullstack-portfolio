import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { deleteContact, getContacts } from "../api/contactApi";
import { Mail, Calendar, User, Trash2, AlertCircle, MessageSquare } from "lucide-react";

type Contact = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function AdminMessages() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getContacts();
      setContacts(data || []);
    } catch {
      setError("Failed to fetch client messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await deleteContact(id);
      loadContacts();
    } catch {
      alert("Failed to delete message");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Client Messages
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Review details of inquiries received through the public contact form.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-950/20 dark:text-rose-400">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="mt-4 text-sm font-medium">Fetching messages...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 dark:bg-slate-900 dark:text-slate-500">
            <MessageSquare size={20} />
          </div>
          <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">No messages</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">You don't have any contact inquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((item) => (
            <div
              key={item._id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-violet-500/20 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                      Subject
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.subject || "No Subject"}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <User size={13} className="text-slate-400" />
                      {item.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail size={13} className="text-slate-400" />
                      <a href={`mailto:${item.email}`} className="hover:underline hover:text-violet-600">
                        {item.email}
                      </a>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-slate-400" />
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="self-end sm:self-start inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-rose-500 transition hover:bg-rose-50 hover:text-rose-600 dark:border-slate-800 dark:hover:bg-rose-950/20"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="mt-4 rounded-xl bg-slate-50/50 p-4 border border-slate-100 text-sm leading-relaxed text-slate-700 dark:bg-slate-900/20 dark:border-slate-800/40 dark:text-slate-300">
                {item.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}