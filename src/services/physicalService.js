import axios from "axios";

const API_URL = "http://localhost:5000/api/physical";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getPhysical = () => axios.get(API_URL, getAuthHeader());
export const getPhysicalById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createPhysical = (data) =>
  axios.post(API_URL, data, getAuthHeader());
export const updatePhysical = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deletePhysical = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
