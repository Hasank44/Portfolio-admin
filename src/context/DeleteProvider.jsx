import React, { createContext, useCallback, useContext } from "react";
import api from "../utils/sentAuthHeader";
import { Message } from "./MessageContext";

export const Delete = createContext();

const DeleteProvider = ({ children }) => {
  const { toast } = useContext(Message);
  const apiUrl = import.meta.env.VITE_API_URL;

  // 🔥 Universal update function
  const deleteData = useCallback(
    async (endpoint, id) => {
      try {
        const response = await api.delete(`${apiUrl}/${endpoint}/${id}`);
        toast.success(response.data.message || "Delete Successfully!");
        console.log(response)
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    },
    [toast, apiUrl]
  );

  const values = {
    skillDelete: (id) => deleteData("skill", id),
    projectDelete: (id) => deleteData("project", id),
    serviceDelete: (id) => deleteData("service", id),
    contactDelete: (id) => deleteData("contact", id ),
    footerNewsDelete: (id) => deleteData("footer", id),
  };

  return <Delete.Provider value={values}>{children}</Delete.Provider>;
};

export default DeleteProvider;
