import axios from "axios";

const API_URL = "http://localhost:5000/api/router";

export const getAllRouter = () => axios.get(API_URL);
export const getRouterById = (id) => axios.get(`${API_URL}/${id}`);
export const createRouter = (data) => axios.post(API_URL, data);
export const updateRouter = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteRouter = (id) => axios.delete(`${API_URL}/${id}`);
