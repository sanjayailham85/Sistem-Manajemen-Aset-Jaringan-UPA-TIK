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

export const getHost = () => axios.get(API_URL, getAuthHeader());
export const getHostById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createHost = (data) => axios.post(API_URL, data, getAuthHeader());
export const updateHost = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteHost = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
