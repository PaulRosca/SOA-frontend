import React, { createContext, PropsWithChildren, useState } from "react";
import { User, UserContextProps } from "../types";


export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => { }
});

export const UserProvider = ({ children }: PropsWithChildren<React.ReactNode>) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
