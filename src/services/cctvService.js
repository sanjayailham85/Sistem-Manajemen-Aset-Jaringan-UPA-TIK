import axios from "axios";

const API_URL = "http://localhost:5000/api/cctv";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllCCTV = () => axios.get(API_URL, getAuthHeader());
export const getCCTVById = (id) =>
  axios.get(`${API_URL}/${id}`, getAuthHeader());
export const createCCTV = (data) => axios.post(API_URL, data, getAuthHeader());
export const updateCCTV = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getAuthHeader());
export const deleteCCTV = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader());
