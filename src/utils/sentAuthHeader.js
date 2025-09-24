import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: URL,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default api;