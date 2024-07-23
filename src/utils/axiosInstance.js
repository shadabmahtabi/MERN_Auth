import axios from "axios";
import { useDispatch } from "react-redux";
import { signOut } from "../store/authSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message === "Token has expired") {
        // Dispatch signOut action to clear session
        const dispatch = useDispatch();
        dispatch(signOut());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
