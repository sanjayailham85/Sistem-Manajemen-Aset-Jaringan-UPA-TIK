import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET USERS (kalau sudah ada endpoint /users)
export const getAllUsers = () => axios.get(`${API_URL}/users`, getAuthHeader());

// CREATE USER → PAKAI REGISTER (INI FIX UTAMA)
export const createUser = (data) =>
  axios.post(`${API_URL}/register`, data, getAuthHeader());

// UPDATE (belum benar-benar ada backend)
export const updateUser = (id, data) =>
  axios.put(`${API_URL}/users/${id}`, data, getAuthHeader());

// DELETE
export const deleteUser = (id) =>
  axios.delete(`${API_URL}/users/${id}`, getAuthHeader());
