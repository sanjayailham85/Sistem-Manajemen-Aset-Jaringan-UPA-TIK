import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/auth`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllUsers = () => axios.get(`${API_URL}/users`, getAuthHeader());

export const createUser = (data) =>
  axios.post(`${API_URL}/register`, data, getAuthHeader());

export const updateUser = (id, data) =>
  axios.put(`${API_URL}/users/${id}`, data, getAuthHeader());

export const deleteUser = (id) =>
  axios.delete(`${API_URL}/users/${id}`, getAuthHeader());

export const updatePassword = (data) =>
  axios.put(`${API_URL}/users/updatePassword`, data, getAuthHeader());
