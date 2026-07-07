import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { getSettings, saveSettings } from "../api/settingsApi";
import { uploadImage, uploadResume } from "../../upload/api/uploadApi";
import { User, Share2, Image as ImageIcon, Sparkles, Save, ShieldAlert, CheckCircle2, FileText, Globe } from "lucide-react";

const defaultForm = {
  fullName: "",
  title: "",
  shortBio: "",
  email: "",
  phone: "",
  location: "",
  github: "",
  linkedin: "",
  twitter: "",
  profileImage: "",
  resumeUrl: "",
  heroTitle: "",
  heroDescription: "",
};

export default function AdminSettings() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [activeSection, setActiveSection] = useState("personal");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await getSettings();
        if (data) {
          setForm({
            fullName: data.fullName || "",
            title: data.title || "",
            shortBio: data.shortBio || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            github: data.github || "",
            linkedin: data.linkedin || "",
            twitter: data.twitter || "",
            profileImage: data.profileImage || "",
            resumeUrl: data.resumeUrl || "",
            heroTitle: data.heroTitle || "",
            heroDescription: data.heroDescription || "",
          });
        }
      } catch (err) {
        setErrorMsg("Failed to retrieve existing portfolio settings.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setErrorMsg("");
      setSuccessMsg("");
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, profileImage: url }));
      setSuccessMsg("Profile image uploaded successfully");
    } catch {
      setErrorMsg("Failed to upload profile image.");
    } finally {
      setUploading(false);
    }
  };

  const handleResumeUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setErrorMsg("");
      setSuccessMsg("");
      const url = await uploadResume(file);
      setForm((prev) => ({ ...prev, resumeUrl: url }));
      setSuccessMsg("Resume PDF uploaded successfully");
    } catch {
      setErrorMsg("Failed to upload resume PDF.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      setSaving(true);
      await saveSettings(form);
      setSuccessMsg("Portfolio settings saved successfully.");
      // Refresh adminUser details in localStorage if full name or image has changed
      const currentAdmin = JSON.parse(localStorage.getItem("adminUser") || "{}");
      localStorage.setItem("adminUser", JSON.stringify({
        ...currentAdmin,
        name: form.fullName || currentAdmin.name,
        profileImage: form.profileImage || currentAdmin.profileImage
      }));
    } catch (err) {
      setErrorMsg("Failed to update settings. Please check credentials.");
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "social", label: "Social Links", icon: Share2 },
    { id: "media", label: "Media Uploads", icon: ImageIcon },
    { id: "hero", label: "Hero Content", icon: Sparkles },
    { id: "seo", label: "SEO Config", icon: Globe },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Portfolio Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Configure personal metadata, upload resume files, and edit hero content.
        </p>
      </div>

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

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="mt-4 text-sm font-medium">Fetching portfolio settings...</p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Menu */}
          <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 lg:col-span-1 h-fit">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  type="button"
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/10"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-850 dark:hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {sec.label}
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 lg:col-span-3 space-y-6"
          >
            {/* Section 1: Personal Info */}
            {activeSection === "personal" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
                  Personal Information
                </h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Ashish Kumar"
                      className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Professional Title
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Full Stack Developer"
                      className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Contact Email
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="hello@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 9999999999"
                      className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Location / Region
                    </label>
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Delhi, India"
                      className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                    Short Biography
                  </label>
                  <textarea
                    name="shortBio"
                    value={form.shortBio}
                    onChange={handleChange}
                    placeholder="Provide a quick summary about your stack, background and services..."
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                  />
                </div>
              </div>
            )}

            {/* Section 2: Social Links */}
            {activeSection === "social" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
                  Social Channels
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      GitHub Profile URL
                    </label>
                    <input
                      name="github"
                      value={form.github}
                      onChange={handleChange}
                      placeholder="https://github.com/your-username"
                      className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      LinkedIn Profile URL
                    </label>
                    <input
                      name="linkedin"
                      value={form.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/your-username"
                      className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      Twitter Profile URL
                    </label>
                    <input
                      name="twitter"
                      value={form.twitter}
                      onChange={handleChange}
                      placeholder="https://twitter.com/your-username"
                      className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section 3: Media Uploads */}
            {activeSection === "media" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
                  Media & Documents
                </h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Profile Picture
                    </label>
                    
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900/50">
                      <ImageIcon size={16} />
                      {uploading ? "Uploading..." : "Replace Profile Image"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>

                    {form.profileImage && (
                      <div className="flex items-center gap-4 rounded-xl border border-slate-100 p-3 dark:border-slate-800">
                        <img
                          src={form.profileImage}
                          alt="Profile Preview"
                          className="h-16 w-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Profile Link</p>
                          <input
                            name="profileImage"
                            value={form.profileImage}
                            onChange={handleChange}
                            className="mt-1 w-full bg-transparent text-xs text-slate-500 dark:text-slate-400 border-none p-0 outline-none truncate"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Resume PDF
                    </label>
                    
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900/50">
                      <FileText size={16} />
                      {uploading ? "Uploading..." : "Replace Resume PDF"}
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleResumeUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>

                    {form.resumeUrl && (
                      <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 dark:border-slate-800">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-950/20">
                          <FileText size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Resume Link</p>
                          <input
                            name="resumeUrl"
                            value={form.resumeUrl}
                            onChange={handleChange}
                            className="mt-1 w-full bg-transparent text-xs text-slate-500 dark:text-slate-400 border-none p-0 outline-none truncate"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Section 4: Hero Content */}
            {activeSection === "hero" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
                  Landing Hero Details
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                    Hero Title
                  </label>
                  <input
                    name="heroTitle"
                    value={form.heroTitle}
                    onChange={handleChange}
                    placeholder="Building Modern Web Apps With Clean UI"
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                    Hero Description
                  </label>
                  <textarea
                    name="heroDescription"
                    value={form.heroDescription}
                    onChange={handleChange}
                    placeholder="Introduce yourself, list core methodologies or express your key selling points..."
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 dark:border-slate-800 dark:focus:border-violet-400"
                  />
                </div>
              </div>
            )}

            {/* Section 5: SEO Config */}
            {activeSection === "seo" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
                  Search Engine Optimization (SEO)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Provide custom SEO metadata to improve Google ranking and social sharing layout tags.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={`${form.fullName || "Ashish Kumar"} | Portfolio`}
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-400 outline-none dark:border-slate-800 dark:bg-slate-900/50 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                    SEO Meta Description
                  </label>
                  <textarea
                    value={form.shortBio || "Personal portfolio site showcasing skills, projects and career details."}
                    disabled
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-400 outline-none dark:border-slate-800 dark:bg-slate-900/50 cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            {/* Save Buttons */}
            <div className="flex justify-end pt-4 border-t dark:border-slate-800">
              <button
                disabled={saving || uploading}
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:bg-violet-400 dark:bg-violet-600"
              >
                <Save size={16} />
                {saving ? "Saving settings..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}