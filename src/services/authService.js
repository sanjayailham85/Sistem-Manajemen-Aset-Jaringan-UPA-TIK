import axios from "axios";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/auth`;

export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
