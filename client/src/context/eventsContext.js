import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axiosInstance";
import { Outlet } from "react-router-dom";
import AuthContext from "./authContext";
import { toast } from "react-toastify";

export const EventsContext = createContext(null);

export const EventsContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [hookups, setHookup] = useState([]);
  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      setLoading(true);
      const results = await api.get("/events");
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
      await api.post("/events", data);
      await getEvents();
      toast.success("Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        toast.error(error.response.data.errors[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Something went wrong. Try agian", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const getHookups = async () => {
    try {
      const hookups = await api.get(`/hookup`);
      console.log(hookups);

      setHookup(hookups.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const createHookup = async ({ gender }) => {
    try {
      setLoading(true);
      await api.post("/hookup", { gender });
      getHookups();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        toast.error(error.response.data.errors[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Something went wrong. Try agian", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const chooseWinner = async (id, userId) => {
    try {
      setLoading(true);
      await api.patch(`/hookup/${id}`, { user: userId });
      getHookups();
      setLoading(false);
      toast.success("Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        toast.error(error.response.data.errors[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Something went wrong. Try agian", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const value = {
    events,
    getEvents,
    createEvent,
    hookups,
    getHookups,
    createHookup,
    chooseWinner,
  };
  return (
    <EventsContext.Provider value={value}>
      <Outlet />
    </EventsContext.Provider>
  );
};

export default EventsContext;
