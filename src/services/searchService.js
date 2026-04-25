import axios from "axios";

export const globalSearch = (query) => {
  return axios.get(`http://localhost:5000/api/search?q=${query}`);
};
