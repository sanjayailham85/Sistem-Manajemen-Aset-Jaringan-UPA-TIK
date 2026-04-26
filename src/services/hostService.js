import axios from "axios";

const API_URL = "http://localhost:5000/api/host";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getHost = async (page = 1, limit = 10) => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    getAuthHeader()
  );

  return response.data;
};
export const getHostById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createHost = (data) => axios.post(API_URL, data, getAuthHeader());
export const updateHost = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteHost = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
