import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, { useEffect, useNavigate } from "react";
import { UsersContextProvider } from "../context/usersContext";
import { EventsContextProvider } from "../context/eventsContext";
import { UploadsContextProvider } from "../context/uploadsContext";

/**
 * import Layouts
 */
import AuthLayout from "../containers/Layout/AuthLayout";
import MainLayout from "../containers/Layout/MainLayout";
/**
 * import views
 */
import Login from "../containers/Views/Login";
import Dashboard from "../containers/Views/Dashboard";
import Events from "../containers/Views/Events";
import Uploads from "../containers/Views/Uploads";
import Users from "../containers/Views/Users";
import Hookup from "../containers/Views/Hookup";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Replace "yourTokenKey" with your actual token key
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Token doesn't exist, redirect to login page
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? element : null;
};

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="" element={<Login />} />
          </Route>

          <Route element={<UsersContextProvider />}>
            <Route path="/dashboard" element={<MainLayout />}>
              <Route element={<EventsContextProvider />}>
                <Route path="events" element={<Events />} />
                <Route path="hookup/:gender" element={<Hookup />} />
              </Route>
              <Route element={<UploadsContextProvider />}>
                <Route path="uploads/:type" element={<Uploads />} />
              </Route>
              <Route>
                <Route path="users" element={<Users />} />
                <Route path="" element={<Dashboard />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
