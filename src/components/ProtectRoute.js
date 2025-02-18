import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import API from "src/views/components/API";

const ProtectRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    const checkAuth = async () => {
      try {
        const tokenString = localStorage.getItem("token");
        
        if (!tokenString) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        const jwt = JSON.parse(tokenString);
        
        const response = await API.post(
          `SignIn.php?action=CheckAuth&token=${jwt.token}`,
          null,
          {
            signal: abortController.signal,
          }
        );

        if (response?.data) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          navigate("/app/dashboard");
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Authentication error:", error);
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          navigate("/login");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      abortController.abort();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">กำลังตรวจสอบ...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectRoute;