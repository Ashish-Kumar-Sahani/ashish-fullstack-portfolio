import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Hero from "../features/public/home/sections/Hero";
import About from "../features/public/home/sections/About";
import Skills from "../features/public/home/sections/Skills";
import Services from "../features/public/home/sections/Services";
import Projects from "../features/public/home/sections/Projects";
import Experience from "../features/public/home/sections/Experience";
import Contact from "../features/public/home/sections/Contact";
import Footer from "../components/layout/Footer";
import AdminLogin from "../features/auth/pages/AdminLogin";
import AdminDashboard from "../features/dashboard/pages/AdminDashboard";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import AdminProjects from "../features/projects/pages/AdminProjects";
import AddProject from "../features/projects/pages/AddProject";
import EditProject from "../features/projects/pages/EditProject";
import AdminMessages from "../features/contact/pages/AdminMessages";
import AdminSkills from "../features/skills/pages/AdminSkills";
import AdminServices from "../features/services/pages/AdminServices";
import AdminExperiences from "../features/experience/pages/AdminExperiences";
import AdminSettings from "../features/settings/pages/AdminSettings";
import { useEffect } from "react";
import { trackVisitor } from "../features/visitors/api/visitorApi";
import AdminProfile from "../features/profile/pages/AdminProfile";
import ProjectDetails from "../features/projects/pages/ProjectDetails";
import SEO from "../components/common/SEO";
import Education from "../features/public/home/sections/Education";
import AdminEducations from "../features/education/pages/AdminEducations";
import AdminVisitors from "../features/visitors/pages/AdminVisitors";
function PortfolioHome() {
  useEffect(() => {
  trackVisitor("/");
}, []);
  return (
    <>
        <SEO
        title="Ashish Kumar | Full Stack Developer"
        description="Full Stack Developer specializing in React, TypeScript, Node.js, MongoDB and modern web applications."
      />
      <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route path="/admin/register" element={<AdminRegister />} /> */}
      <Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/projects"
  element={
    <ProtectedRoute>
      <AdminProjects />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/projects/add"
  element={
    <ProtectedRoute>
      <AddProject />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/projects/edit/:id"
  element={
    <ProtectedRoute>
      <EditProject />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/messages"
  element={
    <ProtectedRoute>
      <AdminMessages />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/skills"
  element={
    <ProtectedRoute>
      <AdminSkills />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/services"
  element={
    <ProtectedRoute>
      <AdminServices />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/educations"
  element={
    <ProtectedRoute>
      <AdminEducations />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/experiences"
  element={
    <ProtectedRoute>
      <AdminExperiences />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/settings"
  element={
    <ProtectedRoute>
      <AdminSettings />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/profile"
  element={
    <ProtectedRoute>
      <AdminProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/visitors"
  element={
    <ProtectedRoute>
      <AdminVisitors />
    </ProtectedRoute>
  }
/>
<Route path="/project/:slug" 
element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;