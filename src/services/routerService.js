import axios from "axios";

const API_URL = "http://localhost:5000/api/router";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllRouter = async (page = 1, limit = 10) => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    getAuthHeader()
  );

  return response.data;
};
export const getRouterById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createRouter = (data) =>
  axios.post(API_URL, data, getAuthHeader());
export const updateRouter = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteRouter = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
