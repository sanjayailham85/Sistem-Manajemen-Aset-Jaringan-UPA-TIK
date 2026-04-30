import axios from "axios";

const API_URL = "http://localhost:5000/api/monitoring";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getAllDevicesMonitoring = () =>
  axios.get(API_URL, getAuthHeader());
