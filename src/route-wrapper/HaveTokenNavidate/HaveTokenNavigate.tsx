import React, { JSX, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  setCookie,
} from "../../services/cookie-service";
import { api } from "../../services/api-service";

const HaveTokenNavigate: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [redirect, setRedirect] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = getAccessTokenFromCookie();
      const refreshToken = getRefreshTokenFromCookie();

      const isTokenExpired = (token: string | null) => {
        if (!token) return true;
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const now = Math.floor(Date.now() / 1000);
          return payload.exp < now;
        } catch {
          return true;
        }
      };

      if (isTokenExpired(accessToken)) {
        // Nếu access token hết hạn → thử refresh
        if (!isTokenExpired(refreshToken)) {
          try {
            const response = await api.post("/auth/refresh", {
              refreshToken,
            });

            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = response.data.result;

            setCookie("accessToken", newAccessToken, 120); // 2 phút
            setCookie("refreshToken", newRefreshToken, 7 * 24 * 60 * 60); // 7 ngày

            setRedirect("/console-home");
          } catch (error) {
            console.error("Refresh token failed:", error);
          }
        }
      } else {
        // Token còn hạn, chuyển sang home
        setRedirect("/console-home");
      }
    };

    checkToken();
  }, [location.pathname]);

  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};

export default HaveTokenNavigate;
