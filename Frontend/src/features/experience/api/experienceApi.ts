import axiosInstance from "../../../api/axiosInstance";

export const getExperiences = async () => {
  const res = await axiosInstance.get("/experiences");
  return res.data.data;
};

export const createExperience = async (data: any) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.post("/experiences", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteExperience = async (id: string) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.delete(`/experiences/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};