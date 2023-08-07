import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

export const EventsContext = createContext(null);

export const EventsContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const results = await axios.get(
        "http://localhost:8000/api/events",
        config
      );
      setEvents(results.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const createEvent = async (data) => {
    try {
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
    } catch (error) {
      console.log(error.response);
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
