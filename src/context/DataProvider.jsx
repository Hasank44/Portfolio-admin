import React, { createContext, useContext } from 'react'
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import api from '../utils/sentAuthHeader';
import { Message } from './MessageContext';

export const Data = createContext();

const DataProvider = ({ children }) => {
  const { toast } = useContext(Message)
  // import backend data
  const apiUrl = import.meta.env.VITE_API_URL;

  // logo
  //logo get
  const [logo, setLogo] = useState({});
useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await axios.get(`${apiUrl}/navbar`);
    setLogo(res.data.result[0] || []);
  } catch (error) {
    toast.error(error.response.data.message);
    };
  };
  fetchData();
}, [apiUrl, toast]);
  
  

  // home
  const [home, setHome] = useState({});
useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await axios.get(`${apiUrl}/home`);
    setHome(res.data.result);
  } catch (error) {
    toast.error(error.response.data.message);
    };
  };
  fetchData();
}, [apiUrl, toast]);

  // about
  const [about, setAbout] = useState({});
  useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await axios.get(`${apiUrl}/about`);
    setAbout(res.data.result);
  } catch (error) {
    toast.error(error.response.data.message);
    };
  };
  fetchData();
}, [apiUrl, toast]);

  // qualification
  const [qualification, setQualification] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await axios.get(`${apiUrl}/qualification`);
    setQualification(res.data.result);
  } catch (error) {
    toast.error(error.response.data.message);
    };
  };
  fetchData();
}, [apiUrl, toast]);
  
  // skill
  const [skill, setSkill] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await axios.get(`${apiUrl}/skill`);
    setSkill(res.data.result);
  } catch (error) {
    toast.error(error.response.data.message);
    };
  };
  fetchData();
  }, [apiUrl, toast]);

  // projects
  const [project, setProject] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await axios.get(`${apiUrl}/project`);
    setProject(res.data.result);
  } catch (error) {
    toast.error(error.response.data.message)
  } 
  };
  fetchData();
}, [apiUrl, toast]);

  // service
  const [service, setService] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await axios.get(`${apiUrl}/service`);
    setService(res.data.result); 
  } catch (error) {
    toast.error(error.response.data.message)
  }
  };
  fetchData();
}, [apiUrl, toast]);

  // achievement
  const [achievement, setAchievement] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await axios.get(`${apiUrl}/achievement`);
    setAchievement(res.data.result); 
  } catch (error) {
    toast.error(error.response.data.message)
  }
  };
  fetchData();
}, [apiUrl, toast]);

  // achieve
  const [achieve, setAchieve] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await axios.get(`${apiUrl}/achieve`);
    setAchieve(res.data.result);
  } catch (error) {
    toast.error(error.response.data.message)
  } 
  };
  fetchData();
}, [apiUrl, toast]);

  // contacts
  const [contact, setContact] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await api.get(`/contact`);
    setContact(res.data.result);
  } catch (error) {
    toast.error(error.response.data.message)
  } 
  };
  fetchData();
  }, [apiUrl, toast]);

  // contactsLocation
  const [contactLocation, setContactLocation] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await axios.get(`${apiUrl}/contact/location`);
    setContactLocation(res.data.result);
  } catch (error) {
    toast.error(error.response.data.message)
  } 
  };
  fetchData();
  }, [apiUrl, toast]);
  
  // contactsSocial
  const [contactSocial, setContactSocial] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await axios.get(`${apiUrl}/contact/social`);
    setContactSocial(res.data.result); 
  } catch (error) {
    toast.error(error.response.data.message)
  }
  };
  fetchData();
}, [apiUrl, toast]);

  // footer
  const [footer, setFooter] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
  try {
    const res = await api.get(`/footer`);
    setFooter(res.data.result); 
  } catch (error) {
    toast.error(error.response.data.message)
  }
  };
  fetchData();
}, [apiUrl, toast]);
  
  const values = {
    logo,
    home,
    about,
    qualification,
    skill,
    project,
    service,
    achievement,
    achieve,
    contact,
    contactLocation,
    contactSocial,
    footer
  };
  return (
    <Data.Provider value={values}>
      {children}
    </Data.Provider>
  )
};

export default DataProvider;