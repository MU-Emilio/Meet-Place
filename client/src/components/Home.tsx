import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { UserContext } from "./UserContext";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/viewer", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    setUser(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Welcome {user?.username}</div>;
};

export default Home;
