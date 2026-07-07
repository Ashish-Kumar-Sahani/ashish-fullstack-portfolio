import axiosInstance from "../../../api/axiosInstance";

export const downloadResume = async () => {
  const res = await axiosInstance.get(
    "/resume/download",
    { responseType: "blob" }
  );

  return res.data;
};