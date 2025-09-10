import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

//fetch CSRF cookie before each request
api.interceptors.request.use(async (config) => {
  // Fetch CSRF cookie from Laravel
  await axios.get(`${baseURL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });

  // Read token from cookie
  const token = Cookies.get("XSRF-TOKEN");

  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }

  return config;
});

export default api;
