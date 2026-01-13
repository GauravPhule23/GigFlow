import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Point to your Backend Port
  withCredentials: true,            // 🍪 THIS FORCES COOKIES
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;