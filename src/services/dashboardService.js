// services/guestService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard/stats";

export const getDashboardStat = () => axios.get(API_URL);
