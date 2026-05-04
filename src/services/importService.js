import axios from "axios";

const API_URL = "http://localhost:5000/api/import";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const importData = (formData) => axios.post(API_URL, formData);
