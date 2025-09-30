import axios from "axios";

// ✅ Safe storage accessor (works both on client & server)
const storage = {
  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken");
    }
    return null;
  },
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  },
  clearToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
  },
};

// ✅ Resolve API base URL dynamically
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
};

const api = axios.create({
  // baseURL: getBaseURL(),
  baseURL: "https://circledev.godeskless.com", // ✅ fixed
  headers: { "Content-Type": "application/json" },
});

// ✅ Attach token on every request
api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// (Optional) Handle expired tokens globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      storage.clearToken();
      // You can redirect to login page here if needed
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { storage };
export default api;
