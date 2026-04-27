import axios from "axios";

const API_URL = "http://localhost:5000/api/osVersion";

export const getAllOsVersion = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);

  return response.data;
};
export const getOsVersionById = (id) => axios.get(`${API_URL}/${id}`);
export const createOsVersion = (data) => axios.post(API_URL, data);
export const updateOsVersion = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);
export const deleteOsVersion = (id) => axios.delete(`${API_URL}/${id}`);
