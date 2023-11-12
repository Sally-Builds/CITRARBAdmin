import React, { useContext, useEffect, useNavigate } from "react";
import Navbar from "../../components/Navbar";
import Content from "../../components/Content";
import { Outlet } from "react-router-dom";
import AuthContext from "../../context/authContext";
import LoadingOverlay from "react-loading-overlay";
import { CirclesWithBar } from "react-loader-spinner";

const AuthLayout = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const token = localStorage.getItem("token"); // Replace "yourTokenKey" with your actual token key

  useEffect(() => {
    if (!token) {
      // Token doesn't exist, redirect to login page
      window.location.replace("/");
    }
  }, [token]);

  return (
    <LoadingOverlay
      active={loading}
      text="Loading..."
      spinner={<CirclesWithBar />}
      className="w-full h-screen"
      styles={{
        overlay: (base) => ({
          ...base,
          background: "rgba(255, 253, 154, 0.8)",
          color: "gray",
          height: "100%",
          width: "100%",
          position: "fixed",
        }),
      }}
    >
      <div className="bg-gray-50 dark:bg-gray-900 grid grid-cols-12 gap-4 w-full h-screen">
        <Navbar />
        <Content>
          <Outlet />
        </Content>
      </div>
    </LoadingOverlay>
  );
};

export default AuthLayout;
