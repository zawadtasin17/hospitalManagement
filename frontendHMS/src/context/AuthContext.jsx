// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  // auth = { token, userType, id?, name? }

  // Login: save auth info to state + localStorage
  const login = (authData) => {
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));
    if (authData.token) {
      localStorage.setItem("jwtToken", authData.token);
    }
  };

  // Logout: clear state + localStorage
  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("jwtToken");
  };

  // Load from localStorage on app start
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    const savedToken = localStorage.getItem("jwtToken");
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      // ensure token is also set
      if (savedToken && !parsed.token) {
        parsed.token = savedToken;
      }
      setAuth(parsed);
    }
  }, []);

  return (
      <AuthContext.Provider value={{ auth, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
