import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Initialize authentication state based on localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token"); // Convert token presence to boolean
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true); // ✅ Ensure state updates correctly
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
