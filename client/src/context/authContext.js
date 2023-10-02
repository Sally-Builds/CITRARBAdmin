import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:8000/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", result.data.token);
      setUser(result.data.user);
      window.location.replace("/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  const value = {
    user,
    loading,
    setLoading,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
