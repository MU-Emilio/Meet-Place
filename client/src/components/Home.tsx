import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";

interface User {
  username: string;
  objectId: string;
}

const Home = () => {
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/vieer", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User | null>(["user"], fetchData);

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error)
    return <p>{`An error has occurred: ${error.message}`}</p>;

  return <div>Welcome {data?.username}</div>;
};

export default Home;
