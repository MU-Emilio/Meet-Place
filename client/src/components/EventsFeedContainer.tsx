import React from "react";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading";
import EventsFeed from "./EventsFeed";

import { useParams } from "react-router-dom";

interface Props {
  username: string | undefined;
}

const EventsFeedContainer = ({ username }: Props) => {
  const params = useParams();
  //   const userId = params.userId;

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:3001/events/${username}`,
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
    [`eventNumber-${username}`],
    fetchData
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error instanceof Error) {
    return <p>{`An error has occurred: ${error.message}`}</p>;
  }

  return (
    <div className="h-[800px] ">
      <EventsFeed username={username as string} pages={data ? data : 1} />
    </div>
  );
};

export default EventsFeedContainer;
