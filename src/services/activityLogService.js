import axios from "axios";

const API_URL = "http://localhost:5000/api/activitylog";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getRecent = async (limit = 5) => {
  const response = await axios.get(
    `${API_URL}/recent?limit=${limit}`,
    getAuthHeader()
  );

  return response.data;
};

export const getAll = async () => {
  const response = await axios.get(API_URL, getAuthHeader());

  return response.data;
};
