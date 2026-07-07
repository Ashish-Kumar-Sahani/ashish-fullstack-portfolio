import axiosInstance from "../../../api/axiosInstance";

export const getSettings = async () => {
  const res = await axiosInstance.get("/settings");

  return res.data.data;
};

export const saveSettings = async (
  data: any
) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.put(
    "/settings",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
};