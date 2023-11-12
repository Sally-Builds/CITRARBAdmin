import React, { createContext, useState } from "react";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await api.post("/users/admin/login", {
        email,
        password,
      });
      localStorage.setItem("token", result.data.token);
      setUser(result.data.user);
      window.location.replace("/dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        toast.error(error.response.data.errors[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Something went wrong. Try agian", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  const value = {
    user,
    loading,
    setLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
