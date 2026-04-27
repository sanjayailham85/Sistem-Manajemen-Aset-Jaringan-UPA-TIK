import axios from "axios";

const API_URL = "http://localhost:5000/api/import";

export const importData = (formData) => axios.post(API_URL, formData);
