import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import AuthContext from "./authContext";

export const UsersContext = createContext(null);

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userAggregates, setUserAggregates] = useState({
    labels: [],
    data: [],
  });
  const [info, setInfo] = useState("");

  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
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
      await axios
        .get(`http://localhost:8000/api/users/admin${query}`, config)
        .then((results) => {
          const data = results.data.aggregates;
          setUserAggregates({ data: data.y, label: data.x });
        });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const results = await axios.get(
        "http://localhost:8000/api/users",
        config
      );
      console.log(results);
      setUsers(results.data.members);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const userInfo = async (userId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios
        .get(`http://localhost:8000/api/users/aggregate/${userId}`, config)
        .then((res) => {
          console.log(res);
          setInfo(res.data.aggregates);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  const value = {
    users,
    getUsers,
    userAgg,
    userAggregates,
    userInfo,
    info,
  };
  return (
    <UsersContext.Provider value={value}>
      <Outlet />
    </UsersContext.Provider>
  );
};

export default UsersContext;
