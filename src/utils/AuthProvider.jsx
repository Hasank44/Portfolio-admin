// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

  const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const expiry = localStorage.getItem("expiry");

    if (token && expiry) {
      if (Date.now() > parseInt(expiry)) {
        localStorage.clear();
        setUser(null);
      } else {
        setUser({
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
          role: localStorage.getItem("role"),
          id: localStorage.getItem("id"),
        });
      }
    }
    setLoading(false);

    const interval = setInterval(() => {
      const expiryCheck = localStorage.getItem("expiry");
      if (expiryCheck && Date.now() > parseInt(expiryCheck)) {
        localStorage.clear();
        setUser(null);
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const login = (data) => {
    const token = data.token;
    const expiryTime = Date.now() + 24 * 60 * 60 * 1000;

    localStorage.setItem("token", token);
    localStorage.setItem("expiry", expiryTime.toString());
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);
    localStorage.setItem("id", data.id);

    setUser({
      name: data.name,
      email: data.email,
      role: data.role,
      id: data.id,
    });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
