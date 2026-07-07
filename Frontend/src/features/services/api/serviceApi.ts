import axiosInstance from "../../../api/axiosInstance";

export const getServices = async () => {
  const res = await axiosInstance.get("/services");
  return res.data.data;
};

export const createService = async (data: any) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.post("/services", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteService = async (id: string) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.delete(`/services/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};