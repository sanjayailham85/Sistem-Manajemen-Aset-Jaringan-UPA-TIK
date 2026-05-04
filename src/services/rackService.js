import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/rack`;
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getRacks = async (page = 1, limit = 10) => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    getAuthHeader()
  );

  return response.data;
};
export const getRackById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createRack = (data) => {
  return axios.post(API_URL, data, getAuthHeader());
};
export const updateRack = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteRack = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
