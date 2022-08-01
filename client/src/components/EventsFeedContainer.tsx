import React from "react";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading";
import EventsFeed from "./EventsFeed";

import { useParams } from "react-router-dom";

const EventsFeedContainer = () => {
  const params = useParams();
  const userId = params.userId;

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:3001/events/${params.userId}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );

    // Convert response to number
    return response.data * 1;
  };

  const { isLoading, error, data } = useQuery<number>(
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

  return (
    <div className="h-[800px]">
      <EventsFeed userId={userId as string} pages={data} />
    </div>
  );
};

export default EventsFeedContainer;
