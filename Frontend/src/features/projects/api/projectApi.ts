import axiosInstance from "../../../api/axiosInstance";

export const getProjects = async () => {
  const res = await axiosInstance.get("/projects");
  return res.data.data;
};

export const createProject = async (data: any) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.post("/projects", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteProject = async (id: string) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.delete(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const getProjectById = async (id: string) => {
  const res = await axiosInstance.get(`/projects/${id}`);
  return res.data.data;
};
export const getProjectBySlug = async (slug: string) => {
  const res = await axiosInstance.get(`/projects/slug/${slug}`);
  return res.data.data;
};

export const updateProject = async (id: string, data: any) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.put(`/projects/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};