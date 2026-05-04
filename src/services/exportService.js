import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/export`;

const token = localStorage.getItem("token");

export const exportData = (payload) =>
  axios.post(API_URL, payload, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
