import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8000", // Laravel backend
  withCredentials: true, // Send cookies
});

// Intercept every request to ensure XSRF token is attached
api.interceptors.request.use(async (config) => {
  let token = Cookies.get("XSRF-TOKEN");

  // If token is missing, fetch it from Laravel
  if (!token) {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });
    token = Cookies.get("XSRF-TOKEN");
  }

  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }

  return config;
});

export default api;
