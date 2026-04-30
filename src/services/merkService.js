import axios from "axios";

const API_URL = "http://localhost:5000/api/merk";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getAllMerk = async (page = 1, limit = 10) => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    getAuthHeader()
  );

  return response.data;
};
export const getMerkById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createMerk = (data) => axios.post(API_URL, data, getAuthHeader());
export const updateMerk = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteMerk = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
