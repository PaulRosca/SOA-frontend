import axios from "axios";
import { Credentials, User } from "../types";

const baseURL = "http://localhost:9000/auth";

export const signout = async (): Promise<void> => {
  await axios.post(baseURL + "/signout", null, { withCredentials: true });
};

export const signup = async (userData: User): Promise<User> => {
  const response = await axios.post(baseURL + "/signup", { ...userData }, { withCredentials: true });
  return response.data;
};

export const signin = async (credentials: Credentials): Promise<User> => {
  const response = await axios.post(baseURL + "/signin", { ...credentials }, { withCredentials: true });
  return response.data;
};
