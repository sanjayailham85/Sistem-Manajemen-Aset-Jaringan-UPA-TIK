import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/accessPoint`;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllAccessPoint = async (
  page = 1,
  limit = 10,
  controllerId = ""
) => {
  const response = await axios.get(
    `${API_URL}?page=${page}&limit=${limit}&controllerId=${controllerId}`,
    getAuthHeader()
  );

  return response.data;
};
export const getAccessPointById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createAccessPoint = (data) =>
  axios.post(API_URL, data, getAuthHeader());
export const updateAccessPoint = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteAccessPoint = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
