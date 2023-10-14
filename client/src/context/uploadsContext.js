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
  const createMarketProduct = async ({
    name,
    price,
    category,
    description,
    images,
  }) => {
    console.log(name, price);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    console.log(images, "images display");
    images.forEach((el, i) => {
      formData.append(`images`, el);
    });

    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";

      const market = await axios({
        method: "post",
        url: "http://localhost:8000/api/products",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      console.log(market);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //create eyewitness
  const createEyeWitness = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("video", data.video);

    if (data.location) {
      formData.append("location", data.location);
    }

    if (data.description) {
      formData.append("description", data.description);
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";

      const eye_witness = await axios({
        method: "post",
        url: "http://localhost:8000/api/eye_witness",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      console.log(eye_witness);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // create music
  const createMusic = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("file", data.file);

    if (data.image) {
      formData.append("image", data.image);
    }

    if (data.description) {
      formData.append("description", data.description);
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";

      const music = await axios({
        method: "post",
        url: "http://localhost:8000/api/music",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      console.log(music);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
    createMarketProduct,
    createMusic,
    createEyeWitness,
    // createEvecreateMusicnt,
  };
  return (
    <UploadsContext.Provider value={value}>
      <Outlet />
    </UploadsContext.Provider>
  );
};

export default UploadsContext;
