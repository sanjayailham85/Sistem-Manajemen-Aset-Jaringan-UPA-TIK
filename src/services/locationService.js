import axios from "axios";

const API_URL = "http://localhost:5000/api/location";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getAllLocation = async (page = 1, limit = 10) => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    getAuthHeader()
  );

  return response.data;
};
export const getLocationById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createLocation = (data) =>
  axios.post(API_URL, data, getAuthHeader());
export const updateLocation = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteLocation = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
