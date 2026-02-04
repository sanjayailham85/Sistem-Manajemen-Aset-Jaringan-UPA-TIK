// services/physicalService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/physical";

export const getPhysical = () => axios.get(API_URL);
export const getPhysicalById = (id) => axios.get(`${API_URL}/${id}`);
export const createPhysical = (data) => axios.post(API_URL, data);
export const updatePhysical = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deletePhysical = (id) => axios.delete(`${API_URL}/${id}`);
