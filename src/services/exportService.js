import axios from "axios";

const API_URL = "http://localhost:5000/api/export";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const exportData = (payload) =>
  axios.post(
    API_URL,
    payload,
    {
      responseType: "blob",
    },
    getAuthHeader()
  );
