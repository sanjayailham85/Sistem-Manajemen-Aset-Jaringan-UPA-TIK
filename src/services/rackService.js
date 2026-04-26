import axios from "axios";

const API_URL = "http://localhost:5000/api/rack";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getRacks = () => axios.get(API_URL, getAuthHeader());
export const getRackById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createRack = (data) => axios.post(API_URL, data, getAuthHeader());
export const updateRack = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteRack = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
