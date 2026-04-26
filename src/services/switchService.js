import axios from "axios";

const API_URL = "http://localhost:5000/api/switch";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllSwitch = async (page = 1, limit = 10) => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}`,
    getAuthHeader()
  );

  return response.data;
};
export const getSwitchById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createSwitch = (data) =>
  axios.post(API_URL, data, getAuthHeader());
export const updateSwitch = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteSwitch = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
