import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { formatUrl } from "@/helpers/url.helper";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/config/env.config";
import { apiManager } from "@/helpers/apiManager";
import { STORAGE_KEYS } from "@/constants/storage.constant";

const BASE_URL = API_URL;
// const MAX_RETRIES = 5;

export const axiosInstance = axios.create({
  baseURL: formatUrl(BASE_URL),
  timeout: 100000,
  // withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const clonedConfig = { ...config };
    apiManager.setLastApiCall(() => axiosInstance(clonedConfig));
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    if (response.status === 200) {
      // Only show success toast for mutations (POST, PUT, DELETE)
      if (
        ["POST", "PUT", "DELETE"].includes(
          response.config.method?.toUpperCase() || ""
        )
      ) {
        toast({
          title: "Success",
          description: "Operation completed successfully",
          variant: "default",
        });
      }
      return response.data;
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle specific error cases
    if (error.response) {
      // Handle 401 Unauthorized and 403 Forbidden
      if (error.response.status === 401 || error.response.status === 403) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

          if (!refreshToken) {
            // Handle missing token case explicitly
            toast({
              title: "Authentication Error",
              description: "Session data missing, please login again",
              variant: "destructive",
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            window.location.href = "/auth/login";
            return Promise.reject(error);
          }

          if (refreshToken && !originalRequest.url?.includes("refresh-token")) {
            try {
              const response = await axiosInstance.post("/auth/refresh-token", {
                refreshToken,
              });

              const { accessToken } = response.data;
              localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);

              // Retry original request
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${accessToken}`,
              };
              return axiosInstance(originalRequest);
            } catch (refreshError) {
              // If refresh token is invalid, logout user
              console.error("Refresh token error:", refreshError);
              localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
              localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
              toast({
                title: "Session Expired",
                description: "Please login again",
                variant: "destructive",
              });
              await new Promise((resolve) => setTimeout(resolve, 2000));
              window.location.href = "/auth/login";
            }
          } else {
            // No refresh token available, logout user
            // wait 3 seconds before redirecting to login page

            localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            toast({
              title: "Authentication Error",
              description: "Please login to continue",
              variant: "destructive",
            });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            window.location.href = "/auth/login";
          }
        } catch (refreshError) {
          console.log("Error refreshing token:", refreshError);
        }
      } else {
        // Handle other errors
        const errorMessage =
          (error.response.data as { message: string })?.message ||
          "Something went wrong";
        toast({
          title: error.response.status === 422 ? "Validation Error" : "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } else if (error.request) {
      toast({
        title: "Network Error",
        description: "Please check your internet connection",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }

    return Promise.reject(error);
  }
);
