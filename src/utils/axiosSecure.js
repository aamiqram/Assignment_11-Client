import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Firebase ID token to every request
axiosSecure.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401) and retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const newToken = await user.getIdToken(true);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosSecure(originalRequest);
        } catch (refreshError) {
          // Token refresh failed, redirect to login
          console.error("Token refresh failed:", refreshError);
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      console.error("Access forbidden:", error.response.data);
    }

    if (error.response?.status === 404) {
      console.error("Resource not found:", error.config.url);
    }

    return Promise.reject(error);
  }
);

// Helper functions for common API calls
export const api = {
  // Meals
  getMeals: (params) => axiosSecure.get("/meals", { params }),
  getMealById: (id) => axiosSecure.get(`/meal/${id}`),
  getRelatedMeals: (chefId, excludeId) =>
    axiosSecure.get(`/meals/chef/${chefId}?exclude=${excludeId}`),

  // Reviews
  getReviews: (mealId) => axiosSecure.get(`/reviews/${mealId}`),
  getRecentReviews: () => axiosSecure.get("/recent-reviews"),
  createReview: (data) => axiosSecure.post("/reviews", data),

  // Chefs
  getFeaturedChefs: () => axiosSecure.get("/chefs?featured=true"),
  getChefById: (chefId) => axiosSecure.get(`/chef/${chefId}`),

  // Stats
  getHomeStats: () => axiosSecure.get("/stats/home"),
  getAdminStats: () => axiosSecure.get("/admin/stats"),

  // Orders
  createOrder: (data) => axiosSecure.post("/orders", data),
  getUserOrders: (email) => axiosSecure.get(`/orders/${email}`),
  updateOrderStatus: (id, status) =>
    axiosSecure.patch(`/orders/${id}`, { orderStatus: status }),

  // Favorites
  getFavorites: (email) => axiosSecure.get(`/favorites/${email}`),
  addFavorite: (data) => axiosSecure.post("/favorites", data),
  removeFavorite: (id) => axiosSecure.delete(`/favorites/${id}`),

  // User Management
  getUserProfile: (email) => axiosSecure.get(`/user/${email}`),
  updateUserProfile: (email, data) => axiosSecure.put(`/user/${email}`, data),
  getUsers: () => axiosSecure.get("/users"),

  // Role Requests
  createRoleRequest: (data) => axiosSecure.post("/requests", data),
  getRoleRequests: () => axiosSecure.get("/requests"),
  updateRoleRequest: (id, status) =>
    axiosSecure.patch(`/requests/${id}`, { status }),

  // Payments
  createPaymentIntent: (amount) =>
    axiosSecure.post("/create-payment-intent", { totalAmount: amount }),
  updatePaymentStatus: (orderId) => axiosSecure.patch(`/orders/${orderId}/pay`),

  // Filtering
  searchMeals: (query) => axiosSecure.get(`/meals/search?q=${query}`),
  filterMeals: (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return axiosSecure.get(`/meals/filter?${params.toString()}`);
  },
};

export default axiosSecure;
