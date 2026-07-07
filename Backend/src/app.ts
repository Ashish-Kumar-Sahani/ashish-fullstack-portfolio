import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import contactRoutes from "./routes/contact.routes";
import projectRoutes from "./routes/project.routes";
import skillRoutes from "./routes/skill.routes";
import serviceRoutes from "./routes/service.routes";
import experienceRoutes from "./routes/experience.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import uploadRoutes from "./routes/upload.routes";
import settingsRoutes from "./routes/settings.routes";
import resumeRoutes from "./routes/resume.routes";
import analyticsRoutes from "./routes/analytics.routes";
import visitorRoutes from "./routes/visitor.routes";
import educationRoutes from "./routes/education.routes";
const app = express();

app.use(
  cors({
   origin: [
      "http://localhost:5173",
      "https://ashish-fullstack-portfolio-pi.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/educations", educationRoutes);
app.get("/", (_req, res) => {
  res.send("Portfolio Backend API Running");
});
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/settings",settingsRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analytics",analyticsRoutes);
app.use("/api/visitor", visitorRoutes);

export default app;