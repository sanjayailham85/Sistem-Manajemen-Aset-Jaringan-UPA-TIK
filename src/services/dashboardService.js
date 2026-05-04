import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/dashboard`;
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
