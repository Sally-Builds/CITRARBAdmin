import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import AuthContext from "./authContext";

export const UploadsContext = createContext(null);

export const UploadsContextProvider = ({ children }) => {
  const [eyewitness, setEyeWitness] = useState([]);
  const [music, setMusic] = useState([]);
  const [market, setMarket] = useState([]);
  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    getEyeWitness();
  }, []);

  //get EyeWitness
  const getEyeWitness = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const eye_witness = await axios.get(
        "http://localhost:8000/api/eye_witness",
        config
      );
      const music = await axios.get("http://localhost:8000/api/music", config);
      const market = await axios.get(
        "http://localhost:8000/api/products",
        config
      );
      setEyeWitness(eye_witness.data.data);
      setMusic(music.data.data);
      setMarket(market.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  //get music

  //get market products

  //create eyewitness

  // create music

  //create market

  //delete eyewitness

  //delete music

  //delete market

  //   const createEvent = async (data) => {
  //     try {
  //       setLoading(true);
  //       const token = localStorage.getItem("token") || "";
  //       const config = {
  //         headers: { Authorization: `Bearer ${token}` },
  //       };
  //       const result = await axios.post(
  //         "http://localhost:8000/api/events",
  //         data,
  //         config
  //       );
  //       console.log(result);
  //       await getEvents();
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //       console.log(error.response.data.errors);
  //     }
  //   };
  const value = {
    eyewitness,
    music,
    market,
    // createEvent,
  };
  return (
    <UploadsContext.Provider value={value}>
      <Outlet />
    </UploadsContext.Provider>
  );
};

export default UploadsContext;
