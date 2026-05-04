import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/cctv`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllCCTV = async (page = 1, limit = 10, controllerId = "") => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}&controllerId=${controllerId}`,
    getAuthHeader()
  );

  return response.data;
};
export const getCCTVById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createCCTV = (data) => axios.post(API_URL, data, getAuthHeader());
export const updateCCTV = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteCCTV = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
