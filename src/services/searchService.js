import axios from "axios";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const globalSearch = (query) => {
  return axios.get(
    `http://localhost:5000/api/search?q=${query}`,
    getAuthHeader()
  );
};
