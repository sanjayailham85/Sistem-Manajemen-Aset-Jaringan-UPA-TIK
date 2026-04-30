import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getDashboardSummary = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};
