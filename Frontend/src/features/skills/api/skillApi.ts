import axiosInstance from "../../../api/axiosInstance";

export const getSkills = async () => {
  const res = await axiosInstance.get("/skills");
  return res.data.data;
};

export const createSkill = async (data: any) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.post("/skills", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

export const deleteSkill = async (id: string) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.delete(`/skills/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};