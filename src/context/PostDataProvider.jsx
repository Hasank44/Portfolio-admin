import React, { createContext, useCallback, useContext } from "react";
import api from "../utils/sentAuthHeader";
import { Message } from "./MessageContext";

export const Post = createContext();

const PostDataProvider = ({ children }) => {
  const { toast } = useContext(Message);
  const apiUrl = import.meta.env.VITE_API_URL;

  // 🔥 Universal post function
  const postData = useCallback(
    async (endpoint, data) => {
      try {
        const response = await api.post(`${apiUrl}/${endpoint}`, data);

        if (!response.data) {
          toast.error("Item Not Found");
          return null;
          };
        toast.success(response.data.message || "New Data Added Successfully!");
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
        throw error;
      }
    },
    [toast, apiUrl]
  );

  const values = {
    logoPost: ( data) => postData("navbar", data),
    homePost: ( data) => postData("home", data),
    aboutPost: ( data) => postData("about", data),
    qualificationPost: ( data) => postData("qualification", data),
    skillPost: ( data) => postData("skill", data),
    projectPost: (data) => postData("project", data),
    servicePost: ( data) => postData("service", data),
    achievementPost: ( data) => postData("achievement", data),
    contactLocationPost: ( data) => postData("contact/location", data),
    contactSocialPost: ( data) => postData("contact/social", data),
  };

  return <Post.Provider value={values}>{children}</Post.Provider>;
};

export default PostDataProvider;
