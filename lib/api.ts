import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  // Check if the request method requires CSRF protection
  const method = config.method?.toUpperCase();
  const needsCsrf = ["POST", "PUT", "PATCH", "DELETE"].includes(method || "");

  if (needsCsrf) {
    try {
      // Fetch CSRF token from custom backend route
      const { data } = await axios.get(`${baseURL}/csrf-token`, {
        withCredentials: true,
      });

      const token = data.token;
      console.log("CSRF token from /csrf-token route:", token);

      if (token) {
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
      } else {
        console.warn("No CSRF token returned—request may fail with 419.");
      }
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }
  }

  return config;
});

export default api;
