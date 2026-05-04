import axios from "axios";
import API_BASE_URL from "../config/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const globalSearch = (query) => {
  return axios.get(`${API_BASE_URL}/search?q=${query}`, getAuthHeader());
};
