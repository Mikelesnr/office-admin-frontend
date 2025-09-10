import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  // The 'withCredentials' option is crucial for sending and receiving cookies
  // in cross-origin requests.
  withCredentials: true,
});

// Use an Axios request interceptor to handle the XSRF token logic
api.interceptors.request.use(async (config) => {
  // Get the XSRF token from the 'XSRF-TOKEN' cookie
  let token = Cookies.get("XSRF-TOKEN");

  // If the token doesn't exist, make a request to the server to get a new one.
  // This is typically the first call to the backend.
  if (!token) {
    try {
      // Laravel's Sanctum provides this endpoint to set the XSRF cookie.
      await axios.get(`${baseURL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
      // After the request, the cookie should be set, so we fetch it again.
      token = Cookies.get("XSRF-TOKEN");
    } catch (error) {
      console.error("Failed to fetch XSRF cookie:", error);
      // You might want to handle this error more gracefully, e.g., by
      // redirecting the user or showing an error message.
    }
  }

  // If a token is now available, set it in the 'X-XSRF-TOKEN' header.
  // This is required by Laravel Sanctum for cross-domain requests.
  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }

  return config;
});

export default api;
