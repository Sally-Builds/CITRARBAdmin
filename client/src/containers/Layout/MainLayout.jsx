import React from "react";
import Navbar from "../../components/Navbar";
import Content from "../../components/Content";
import { Outlet } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 grid grid-cols-12 gap-4 w-full h-screen">
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default AuthLayout;
