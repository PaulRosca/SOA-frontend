import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { User, UserContextProps } from "../types";


export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => { }
});

function getInitialState() {
  const localUser = localStorage.getItem("user");
  const user = localUser ? JSON.parse(localUser) : null;
  return user;
}

export const UserProvider = ({ children }: PropsWithChildren<React.ReactNode>) => {
  const [user, setUser] = useState<User | null>(getInitialState());
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
