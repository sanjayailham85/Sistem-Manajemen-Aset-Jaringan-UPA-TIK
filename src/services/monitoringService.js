import axios from "axios";

const API_URL = "http://localhost:5000/api/monitoring";

// ambil seluruh data awal sekali
export const getAllDevicesMonitoring = () => axios.get(API_URL);
