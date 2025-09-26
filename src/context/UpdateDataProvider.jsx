import React, { createContext, useCallback, useContext } from "react";
import api from "../utils/sentAuthHeader";
import { Message } from "./MessageContext";

export const Update = createContext();

const UpdateDataProvider = ({ children }) => {
  const { toast } = useContext(Message);
  const apiUrl = import.meta.env.VITE_API_URL;

  // 🔥 Universal update function
  const updateData = useCallback(
    async (endpoint, id, data) => {
      try {
        const response = await api.put(`${apiUrl}/${endpoint}/${id}`, data);

        if (!response.data) {
          toast.error("Item Not Found");
          return null;
          };
        toast.success(response.data.message || "Updated Successfully!");
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
        throw error;
      }
    },
    [toast, apiUrl]
  );

  const values = {
    logoUpdate: (id, data) => updateData("navbar", id, data),
    homeUpdate: (id, data) => updateData("home", id, data),
    aboutUpdate: (id, data) => updateData("about", id, data),
    qualificationUpdate: (id, data) => updateData("qualification", id, data),
    skillUpdate: (id, data) => updateData("skill", id, data),
    projectUpdate: (id, data) => updateData("project", id, data),
    serviceUpdate: (id, data) => updateData("service", id, data),
    achievementUpdate: (id, data) => updateData("achievement", id, data),
    contactLocationUpdate: (id, data) => updateData("contact/location", id, data),
    contactSocialUpdate: (id, data) => updateData("contact/social", id, data),
  };

  return <Update.Provider value={values}>{children}</Update.Provider>;
};

export default UpdateDataProvider;
