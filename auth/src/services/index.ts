import axios from "axios";
import { Credentials, User } from "../types";

axios.defaults.baseURL = "http://localhost:9000/auth/";

export const signup = async (userData: User): Promise<User> => {
  const response = await axios.post("/signup", { ...userData });
  return response.data;
};

export const signin = async (credentials: Credentials): Promise<User> => {
  const response = await axios.post("/signin", { ...credentials });
  return response.data;
};
