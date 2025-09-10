import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  // Log raw cookie string
  console.log("document.cookie:", document.cookie);

  // Attempt to read the XSRF token
  let token = Cookies.get("XSRF-TOKEN");
  console.log("Initial XSRF-TOKEN from js-cookie:", token);

  // If missing, fetch CSRF cookie from backend
  if (!token) {
    try {
      await axios.get(`${baseURL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
      token = Cookies.get("XSRF-TOKEN");
      console.log("Fetched XSRF-TOKEN after csrf-cookie call:", token);
    } catch (error) {
      console.error("Failed to fetch XSRF cookie:", error);
    }
  }

  // Attach token to request header if available
  if (token) {
    const decoded = decodeURIComponent(token);
    console.log("Decoded XSRF-TOKEN attached to header:", decoded);
    config.headers["X-XSRF-TOKEN"] = decoded;
  } else {
    console.warn("No XSRF-TOKEN found—request may fail with 419.");
  }

  return config;
});

export default api;
