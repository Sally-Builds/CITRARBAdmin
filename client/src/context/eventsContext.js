import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import AuthContext from "./authContext";

export const EventsContext = createContext(null);

export const EventsContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const results = await axios.get(
        "http://localhost:8000/api/events",
        config
      );
      console.log(results);
      setEvents(results.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  const createEvent = async (data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const result = await axios.post(
        "http://localhost:8000/api/events",
        data,
        config
      );
      console.log(result);
      await getEvents();
    } catch (error) {
      setLoading(false);
      console.log(error);
      console.log(error.response.data.errors);
    }
  };
  const value = {
    events,
    getEvents,
    createEvent,
  };
  return (
    <EventsContext.Provider value={value}>
      <Outlet />
    </EventsContext.Provider>
  );
};

export default EventsContext;
