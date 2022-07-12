import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Calendar from "./Calendar";

interface User {
  username: string;
  objectId: string;
}

const Home = () => {
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/viewer", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User | null>(["user"], fetchData);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error instanceof Error) {
    return <p>{`An error has occurred: ${error.message}`}</p>;
  }

  return (
    <div>
      <h1>Welcome {data?.username}</h1>
      <Calendar />
    </div>
  );
};

export default Home;
