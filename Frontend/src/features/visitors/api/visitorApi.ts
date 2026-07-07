import axiosInstance from "../../../api/axiosInstance";

export const trackVisitor = async (
page: string
) => {
await axiosInstance.post(
    "/visitor/track",
    {
    page,
    }
);
};
export default trackVisitor;

export const getVisitorStats = async () => {
const response = await axiosInstance.get("/visitor/stats");
return response.data;
};
