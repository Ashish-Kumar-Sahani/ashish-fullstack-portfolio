import axiosInstance from "../../../api/axiosInstance";

export const getAnalytics = async () => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.get(
    "/analytics",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
};