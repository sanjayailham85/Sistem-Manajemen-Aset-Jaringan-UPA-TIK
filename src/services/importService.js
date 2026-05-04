import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/import`;
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const importData = (formData) =>
  axios.post(API_URL, formData, getAuthHeader());
