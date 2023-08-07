import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";
import { AuthContextProvider } from "../context/authContext";
import { UsersContextProvider } from "../context/usersContext";
import { EventsContextProvider } from "../context/eventsContext";

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

const Router = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="" element={<Login />} />
          </Route>
          <Route path="/dashboard" element={<MainLayout />}>
            <Route element={<EventsContextProvider />}>
              <Route path="events" element={<Events />} />
            </Route>
            <Route path="uploads" element={<Uploads />} />
            <Route element={<UsersContextProvider />}>
              <Route path="users" element={<Users />} />
              <Route path="" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default Router;
