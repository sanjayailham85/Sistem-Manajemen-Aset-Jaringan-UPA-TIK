import axios from "axios";

const API_URL = "http://localhost:5000/api/switch";

export const getAllSwitch = () => axios.get(API_URL);
export const getSwitchById = (id) => axios.get(`${API_URL}/${id}`);
export const createSwitch = (data) => axios.post(API_URL, data);
export const updateSwitch = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteSwitch = (id) => axios.delete(`${API_URL}/${id}`);
