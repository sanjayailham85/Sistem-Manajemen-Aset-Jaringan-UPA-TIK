import axios from "axios";

const API_URL = "http://localhost:5000/api/option";

export const getAllOsVersion = () => axios.get(API_URL);
export const getOsVersionById = (id) => axios.get(`${API_URL}/${id}`);
export const createOsVersion = (data) => axios.post(API_URL, data);
export const updateOsVersion = (id, data) =>
  axios.patch(`${API_URL}/${id}`, data);
export const deleteOsVersion = (id) => axios.delete(`${API_URL}/${id}`);
