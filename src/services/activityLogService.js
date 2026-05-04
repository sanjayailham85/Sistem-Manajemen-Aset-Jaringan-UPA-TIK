import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/activitylog`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getRecent = async (limit = 5) => {
  const response = await axios.get(
    `${API_URL}/recent?limit=${limit}`,
    getAuthHeader()
  );

  return response.data;
};

export const getAll = async (page = 1, limit = 10) => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    getAuthHeader()
  );

  return response.data;
};

export const deleteActivityLogs = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
