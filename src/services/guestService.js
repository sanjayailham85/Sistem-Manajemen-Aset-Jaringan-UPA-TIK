import axios from "axios";

const API_URL = "http://localhost:5000/api/guest";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getGuest = () => axios.get(API_URL, getAuthHeader());
export const getGuestById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createGuest = (data) => axios.post(API_URL, data, getAuthHeader());
export const updateGuest = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteGuest = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
