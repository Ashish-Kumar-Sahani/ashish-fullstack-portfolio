import axiosInstance from "../../../api/axiosInstance";

export const getEducations = async () => {
  const res = await axiosInstance.get("/educations");
  return res.data.data;
};

export const createEducation = async (data: any) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.post("/educations", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const updateEducation = async (id: string, data: any) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.put(`/educations/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteEducation = async (id: string) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.delete(`/educations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};