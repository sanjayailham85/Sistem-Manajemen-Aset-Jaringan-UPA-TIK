import axios from "axios";

const API_URL = "http://localhost:5000/api/accessPoint";

export const getAllAccessPoint = () => axios.get(API_URL);
export const getAccessPointById = (id) => axios.get(`${API_URL}/${id}`);
export const createAccessPoint = (data) => axios.post(API_URL, data);
export const updateAccessPoint = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);
export const deleteAccessPoint = (id) => axios.delete(`${API_URL}/${id}`);
