import axiosInstance from "../../../../api/axiosInstance";

export const getSiteSettings = async () => {
  const res = await axiosInstance.get("/settings");
  return res.data.data;
};