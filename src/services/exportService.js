import axios from "axios";

const API_URL = "http://localhost:5000/api/export";
const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
const token = localStorage.getItem("token");

export const exportData = (payload) =>
  axios.post(API_URL, payload, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
