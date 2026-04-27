import axios from "axios";

const API_URL = "http://localhost:5000/api/export";

export const exportData = (payload) =>
  axios.post(API_URL, payload, {
    responseType: "blob",
  });
