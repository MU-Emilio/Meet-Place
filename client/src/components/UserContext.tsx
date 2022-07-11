import { createContext } from "react";
import { useState } from "react";

interface UserContext {
  user: User;
  setUser: (sessionToken: string | null) => null;
}

interface User {
  username: string;
  objectId: string;
}

export const UserContext = createContext<UserContext>({} as UserContext);

import React from "react";
import { SESSION_KEY } from "../lib/constants";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem(SESSION_KEY));
  return (
    // @ts-ignore
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
