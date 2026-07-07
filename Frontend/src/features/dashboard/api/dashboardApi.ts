import axiosInstance from "../../../api/axiosInstance";

export const getDashboardStats = async () => {
  try {
    const res = await axiosInstance.get("/dashboard/stats");

    return res.data.data;
  } catch (error: any) {
    console.error(
      "Dashboard Stats Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};