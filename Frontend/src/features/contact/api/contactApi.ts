import axiosInstance from "../../../api/axiosInstance";

export const sendContactMessage = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const res = await axiosInstance.post("/contact", data);
  return res.data;
};

export const getContacts = async () => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.get("/contact", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.data;
};

export const deleteContact = async (id: string) => {
  const token = localStorage.getItem("adminToken");

  const res = await axiosInstance.delete(`/contact/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};