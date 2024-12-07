import React, { createContext, useState, useEffect, ReactNode } from "react";
import {jwtDecode} from "jwt-decode";
import { PopupNotification } from "../components/PopupNotification";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  token: string | null; 
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
    token: null,
    userId: null,
    login: () => {},
    logout: () => {},
    showPopup: false,
    setShowPopup: () => {},
  });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [userId, setUserId] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode<{ [key: string]: any }>(storedToken);
        return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }
    return null;
  });

  const login = (newToken: string) => {
    try {
      const decoded = jwtDecode<{ [key: string]: any }>(newToken);
      const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      setToken(newToken);
      setUserId(userId || null);
      localStorage.setItem("token", newToken);
    } catch (error) {
      console.error("Error decoding token during login:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    navigate('/');  
  };

  const handleTokenExpiration = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      logout();
    }, 3000);
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded: { exp: number } = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          handleTokenExpiration();
        } else {
          const timeUntilExpiration = decoded.exp * 1000 - Date.now();
          const timeoutId = setTimeout(() => {
            handleTokenExpiration();
          }, timeUntilExpiration);

          return () => clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error("Error decoding token in useEffect:", error);
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, showPopup, setShowPopup }}>
    {children}
    {showPopup && <PopupNotification message="Your session has expired. You will be redirected to the homepage." />}
  </AuthContext.Provider>
  );
};
