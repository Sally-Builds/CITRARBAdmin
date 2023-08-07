import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

export const UsersContext = createContext(null);

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userAggregates, setUserAggregates] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    console.log("hello");
    getUsers();
    userAgg();
  }, []);

  const userAgg = async (year = "") => {
    try {
      const token = localStorage.getItem("token") || "";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let query = "/";
      if (year) {
        query = `?year=${year}`;
      }
      const results = await axios.get(
        `http://localhost:8000/api/users/admin${query}`,
        config
      );
      const data = results.data.aggregates;
      setUserAggregates({ data: data.y, label: data.x });
      console.log(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const results = await axios.get(
        "http://localhost:8000/api/users",
        config
      );
      setUsers(results.data.members);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    users,
    getUsers,
    userAgg,
    userAggregates,
  };
  return (
    <UsersContext.Provider value={value}>
      <Outlet />
    </UsersContext.Provider>
  );
};

export default UsersContext;
