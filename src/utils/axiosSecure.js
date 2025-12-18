import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // handle token refresh or logout
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;
