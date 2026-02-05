import axios from "axios";

const API_URL = "http://localhost:5000/api/rack";

export const getRacks = () => axios.get(API_URL);
export const getRackById = (id) => axios.get(`${API_URL}/${id}`);
export const createRack = (data) => axios.post(API_URL, data);
export const updateRack = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteRack = (id) => axios.delete(`${API_URL}/${id}`);
