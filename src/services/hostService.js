import axios from "axios";

const API_URL = "http://localhost:5000/api/host";

export const getHost = () => axios.get(API_URL);
export const getHostById = (id) => axios.get(`${API_URL}/${id}`);
export const createHost = (data) => axios.post(API_URL, data);
export const updateHost = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteHost = (id) => axios.delete(`${API_URL}/${id}`);
