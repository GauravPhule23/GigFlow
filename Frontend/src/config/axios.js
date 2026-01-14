import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Point to  Backend Port
  withCredentials: true,            // FOR COOKIES
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;