import axiosInstance from "../../../api/axiosInstance";

export const registerAdmin = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data.data;
};

export const loginAdmin = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/login", {
    email: data.email.trim().toLowerCase(),
    password: data.password,
  });

  return res.data.data;
};

export const getAdminProfile = async () => {
  const res = await axiosInstance.get("/auth/profile");
  return res.data.data;
};

export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  const res = await axiosInstance.put("/auth/change-password", data);
  return res.data;
};