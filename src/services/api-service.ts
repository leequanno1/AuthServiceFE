// api-service.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  setCookie,
  removeCookie,
} from "./cookie-service";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Danh sách endpoint không bị redirect về login khi token hết hạn
const PUBLIC_ENDPOINTS = [
  "/auth/**",
  "/account/send-code/**",
  "/account/validate-code",
  "/account/reset-forgot-password",
  "/account/check-existed/**",
];

// Tạo instance axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================================================
//  Request Interceptor – luôn đính kèm access token
// ======================================================
api.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ======================================================
//  Response Interceptor – xử lý token hết hạn
// ======================================================
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function isPublicEndpoint(url?: string): boolean {
  if (!url) return false;
  return PUBLIC_ENDPOINTS.some((pattern) => {
    if (pattern.endsWith("/**")) {
      const prefix = pattern.slice(0, -3);
      return url.startsWith(prefix);
    }
    return url === pattern;
  });
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const url = originalRequest?.url || "";

    // Nếu là public endpoint => không redirect về login
    if (isPublicEndpoint(url)) {
      return Promise.reject(error);
    }

    const responseStatus = error.response?.status;
    const responseData = error.response?.data;

    // Kiểm tra lỗi token hết hạn
    const isInvalidToken =
      responseStatus === 403 &&
      responseData?.message === "Invalid or expired token";

    if (isInvalidToken && !originalRequest._retry) {
      originalRequest._retry = true;

      // Nếu đang refresh, chờ token mới
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            if (!originalRequest.headers) originalRequest.headers = {};
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = getRefreshTokenFromCookie();
        if (!refreshToken) throw new Error("Missing refresh token");

        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          res.data.result;

        // Lưu token mới
        setCookie("accessToken", newAccessToken, 120); // 2 phút
        setCookie("refreshToken", newRefreshToken, 7 * 24 * 60 * 60); // 7 ngày

        onRefreshed(newAccessToken);
        isRefreshing = false;

        // Retry lại request ban đầu
        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh token hết hạn → logout
        isRefreshing = false;
        removeCookie("accessToken");
        removeCookie("refreshToken");

        // Redirect về / nếu đang ở môi trường trình duyệt
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
