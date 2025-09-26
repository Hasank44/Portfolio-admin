import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/sentAuthHeader";
import { Message } from "./MessageContext";

export const Data = createContext();

const DataProvider = ({ children }) => {
  const { toast } = useContext(Message);
  const apiUrl = import.meta.env.VITE_API_URL;

  const endpoints = {
    logo: { url: "/navbar", auth: false, initial: {} },
    home: { url: "/home", auth: false, initial: {} },
    about: { url: "/about", auth: false, initial: {} },
    qualification: { url: "/qualification", auth: false, initial: [] },
    skill: { url: "/skill", auth: false, initial: [] },
    project: { url: "/project", auth: false, initial: [] },
    service: { url: "/service", auth: false, initial: [] },
    achievement: { url: "/achievement", auth: false, initial: [] },
    achieve: { url: "/achieve", auth: false, initial: [] },
    contact: { url: "/contact", auth: true, initial: [] },
    contactLocation: { url: "/contact/location", auth: false, initial: [] },
    contactSocial: { url: "/contact/social", auth: false, initial: [] },
    footer: { url: "/footer", auth: true, initial: [] },
  };

  const [data, setData] = useState(
    Object.fromEntries(
      Object.entries(endpoints).map(([key, cfg]) => [key, cfg.initial])
    )
  );

  const fetchData = async (key, cfg) => {
    try {
      const client = cfg.auth ? api : axios;
      const res = await client.get(`${apiUrl}${cfg.url}`);
      setData((prev) => ({ ...prev, [key]: res.data.result || cfg.initial }));
    } catch (error) {
      toast.error(error?.response?.data?.message || `Failed to load ${key}`);
    }
  };

  useEffect(() => {
    Object.entries(endpoints).forEach(([key, cfg]) => {
      fetchData(key, cfg);
    });
  }, [apiUrl]);

  return (
    <Data.Provider value={data}>
      {children}
    </Data.Provider>
  );
};

export default DataProvider;
