import React from "react";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { User } from "../lib/types";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import FriendsContainer from "./FriendsContainer";
import NotFriendsContainer from "./NotFriendsContainer";

const EventsFeedContainer = () => {
  const params = useParams();

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:3001/events/${params.userId}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<string>(
    [`eventNumber`],
    fetchData
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error instanceof Error) {
    return <p>{`An error has occurred: ${error.message}`}</p>;
  }

  if (!data) {
    return null;
  }

  return <div>{data}</div>;
};

export default EventsFeedContainer;
