import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});

  const login = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    setAuthData({
      token,
      role: payload.role,
      email: payload.email,
      userId: payload.userId, // ✅ store userId
    });
    sessionStorage.setItem("auth", token);
  };

  const logout = () => {
    setAuthData({});
    sessionStorage.removeItem("auth");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("auth");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 > Date.now()) {
        setAuthData({
          token,
          role: payload.role,
          email: payload.email,
          userId: payload.userId,
        });
      } else {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!authData.token,
        token: authData.token,
        email: authData.email,
        role: authData.role,
        userId: authData.userId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
