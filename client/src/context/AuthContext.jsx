import { useContext, useState, useEffect, createContext } from "react";
import {
  loginDoctorRequest,
  loginReceptionistRequest,
  verifyTokenRequest,
} from "../api/auth/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [errors, setErrors] = useState([]);

  const loginDoctor = async (user) => {
    try {
      const response = await loginDoctorRequest(user);
      setRole("doctor");
      setIsAuthenticated(true);
      setErrors([]);
      return response;
    } catch (error) {
      setIsAuthenticated(false);
      setErrors([error.response?.data?.message || "Error al iniciar sesión."]);
    }
  };

  const loginRecepcionist = async (user) => {
    try {
      const response = await loginReceptionistRequest(user);
      setRole("recepcionista");
      setIsAuthenticated(true);
      console.log(isAuthenticated);
      setErrors([]);
      return response;
    } catch (error) {
      setIsAuthenticated(false);
      setErrors([error.response?.data?.message || "Error al iniciar sesión."]);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setRole(null);
    setIsAuthenticated(false);
    setErrors([]);
  };
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        setRole(null);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        if (res && res.user) {
          setIsAuthenticated(true);
          setRole(res.user);
        } else {
          setIsAuthenticated(false);
          setRole(null);
        }
      } catch (error) {
        setErrors([error.response?.data?.message || "Error de autenticación."]);
        console.error(error);
        setIsAuthenticated(false);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        role,
        isAuthenticated,
        loading,
        loginDoctor,
        loginRecepcionist,
        logout,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};