import React, { createContext, useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "./authContext";
import api from "../api/axiosInstance";

export const UsersContext = createContext(null);

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userAggregates, setUserAggregates] = useState({
    labels: [],
    data: [],
  });
  const [featAggregates, setFeatAggregates] = useState({
    labels: [],
    data: [],
  });
  const [info, setInfo] = useState("");
  const [recentEvents, setRecentEvents] = useState([]);

  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    getUsers();
    userAgg();
  }, []);

  const userAgg = async (year = "") => {
    try {
      let query = "/";
      if (year) {
        query = `?year=${year}`;
      }
      await api.get(`/users/admin${query}`).then((results) => {
        const data = results.data.aggregates;
        setUserAggregates({ data: data.y, label: data.x });
        setFeatAggregates({
          data: results.data.uploadsAggregates.data,
          label: results.data.uploadsAggregates.label,
        });
        setRecentEvents(results.data.recentEvents);
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const results = await api.get("/users");
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
      await api.get(`/users/aggregate/${userId}`).then((res) => {
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
    featAggregates,
    userInfo,
    recentEvents,
    info,
  };
  return (
    <UsersContext.Provider value={value}>
      <Outlet />
    </UsersContext.Provider>
  );
};

export default UsersContext;
