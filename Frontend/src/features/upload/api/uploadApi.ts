import axiosInstance from "../../../api/axiosInstance";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axiosInstance.post("/upload/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.url;
};

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await axiosInstance.post("/upload/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.url;
};