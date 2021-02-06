import axios from "./index";

export const signUpToTheServer = async (user) => {
  return (await axios.post(`/api/users/signup`, user)).data;
};
