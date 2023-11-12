import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axiosInstance";
import { Outlet } from "react-router-dom";
import AuthContext from "./authContext";
import { toast } from "react-toastify";

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
      const eye_witness = await getAllEyeWitness();
      const music = await getAllMusic();
      const market = await getAllMarket();
      setEyeWitness(eye_witness.data.data);
      setMusic(music.data.data);
      setMarket(market.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  //get all music
  const getAllMusic = async () => {
    return await api.get("/music");
  };

  const getAllEyeWitness = async () => {
    return await api.get("/eye_witness");
  };

  const getAllMarket = async () => {
    return await api.get("/products");
  };

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

      await api({
        method: "post",
        url: "/products",
        data: formData,
      });
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
      window.location.reload();
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
      await api({
        method: "post",
        url: "/eye_witness",
        data: formData,
      });
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
      window.location.reload();
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

  // create music
  const createMusic = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("genre", data.genre);
    formData.append("file", data.file);

    if (data.image) {
      formData.append("image", data.image);
    }

    if (data.description) {
      formData.append("description", data.description);
    }
    try {
      setLoading(true);

      await api({
        method: "post",
        url: "/music",
        data: formData,
      });
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
      window.location.reload();
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

  //delete eyewitness

  //delete music

  //delete market
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
