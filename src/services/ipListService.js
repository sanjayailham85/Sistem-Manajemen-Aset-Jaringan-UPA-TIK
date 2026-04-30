import axios from "axios";

const API_URL = "http://localhost:5000/api/ipList";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAll = async (page = 1, limit = 10) => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    getAuthHeader()
  );

  return response.data;
};
export const getById = (id) => axios.get(`${API_URL}/${id}`, getAuthHeader());
export const create = (data) => axios.post(API_URL, data, getAuthHeader());
export const update = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteIP = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
