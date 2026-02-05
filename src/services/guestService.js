import axios from "axios";

const API_URL = "http://localhost:5000/api/guest";

export const getGuest = () => axios.get(API_URL);
export const getGuestById = (id) => axios.get(`${API_URL}/${id}`);
export const createGuest = (data) => axios.post(API_URL, data);
export const updateGuest = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteGuest = (id) => axios.delete(`${API_URL}/${id}`);
