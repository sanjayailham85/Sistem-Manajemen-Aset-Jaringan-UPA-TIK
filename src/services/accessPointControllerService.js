import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/accessPointController`;
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getAll = async (page = 1, limit = 10, merkId = "") => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}&merkId=${merkId}`,
    getAuthHeader()
  );

  return response.data;
};
export const getById = (id) => axios.get(`${API_URL}/${id}`, getAuthHeader());
export const create = (data) => axios.post(API_URL, data, getAuthHeader());
export const update = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteAccessPointController = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
