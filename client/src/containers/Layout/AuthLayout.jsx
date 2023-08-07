import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
