import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser: (sessionToken: string | null) => null,
  userID: null,
  setUserID: (userToken: string | null) => null,
});

import React from "react";
import { SESSION_KEY } from "../lib/constants";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem(SESSION_KEY));
  const [userID, setUserID] = useState("");
  return (
    // @ts-ignore
    <UserContext.Provider value={{ user, setUser, userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
