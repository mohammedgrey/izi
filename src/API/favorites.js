import axios from "./index";

export const getMyFavorites = async () => {
  return (await axios.get(`/api/favorites/me`)).data;
};
export const checkFavorites = async (data) => {
  return (await axios.post("/api/favorites/check", data)).data;
};

export const addToFavorites = async (data) => {
  return (await axios.post(`/api/favorites/add`, data)).data;
};

export const removeFromFavorites = async (data) => {
  return (await axios.post(`/api/favorites/remove`, data)).data;
};
