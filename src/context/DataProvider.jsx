import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/sentAuthHeader";
import { Message } from "./MessageContext";

export const Data = createContext();

const DataProvider = ({ children }) => {
  const { toast } = useContext(Message);
  const apiUrl = import.meta.env.VITE_API_URL;

  
  const [logo, setLogo] = useState({});
  const [home, setHome] = useState({});
  const [about, setAbout] = useState({});
  const [qualification, setQualification] = useState([]);
  const [skill, setSkill] = useState([]);
  const [project, setProject] = useState([]);
  const [service, setService] = useState([]);
  const [achievement, setAchievement] = useState([]);
  const [achieve, setAchieve] = useState([]);
  const [contact, setContact] = useState([]);
  const [contactLocation, setContactLocation] = useState([]);
  const [contactSocial, setContactSocial] = useState([]);
  const [footer, setFooter] = useState([]);


  const fetchLogo = async () => {
    try {
      const res = await axios.get(`${apiUrl}/navbar`);
      setLogo(res.data.result || {});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load logo");
    }
  };

  const fetchHome = async () => {
    try {
      const res = await axios.get(`${apiUrl}/home`);
      setHome(res.data.result || {});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load home");
    }
  };

  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${apiUrl}/about`);
      setAbout(res.data.result || {});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load about");
    }
  };

  const fetchQualification = async () => {
    try {
      const res = await axios.get(`${apiUrl}/qualification`);
      setQualification(res.data.result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load qualification");
    }
  };

  const fetchSkill = async () => {
    try {
      const res = await api.get(`${apiUrl}/skill`);
      setSkill(res.data.result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load skill");
    }
  };

  const fetchProject = async () => {
    try {
      const res = await api.get(`${apiUrl}/project`);
      setProject(res.data.result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load project");
    }
  };

  const fetchService = async () => {
    try {
      const res = await api.get(`${apiUrl}/service`);
      setService(res.data.result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load service");
    }
  };

  const fetchAchievement = async () => {
    try {
      const res = await axios.get(`${apiUrl}/achievement`);
      setAchievement(res.data.result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load achievement");
    }
  };

  const fetchAchieve = async () => {
    try {
      const res = await axios.get(`${apiUrl}/achieve`);
      setAchieve(res.data.result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load achieve");
    }
  };

  const fetchContact = async () => {
    try {
      const res = await api.get(`${apiUrl}/contact`);
      setContact(res.data.result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load contact");
    }
  };

  const fetchContactLocation = async () => {
    try {
      const res = await axios.get(`${apiUrl}/contact/location`);
      setContactLocation(res.data.result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load contact location");
    }
  };

  const fetchContactSocial = async () => {
    try {
      const res = await axios.get(`${apiUrl}/contact/social`);
      setContactSocial(res.data.result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load contact social");
    }
  };

  const fetchFooter = async () => {
    try {
      const res = await api.get(`${apiUrl}/footer`);
      setFooter(res.data.result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load footer");
    }
  };

  useEffect(() => {
    fetchLogo();
    fetchHome();
    fetchAbout();
    fetchQualification();
    fetchSkill();
    fetchProject();
    fetchService();
    fetchAchievement();
    fetchAchieve();
    fetchContact();
    fetchContactLocation();
    fetchContactSocial();
    fetchFooter();
  }, [apiUrl]);

  return (
    <Data.Provider
      value={{
        logo, setLogo,
        home, setHome,
        about, setAbout,
        qualification, setQualification,
        skill, setSkill,
        project, setProject,
        service, setService,
        achievement, setAchievement,
        achieve, setAchieve,
        contact, setContact,
        contactLocation, setContactLocation,
        contactSocial, setContactSocial,
        footer, setFooter,
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default DataProvider;
