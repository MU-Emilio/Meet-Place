import React from "react";
import axios from "axios";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading/Loading";
import EventsFeed from "./EventsFeed";

import { useParams } from "react-router-dom";

interface Props {
  username: string | undefined;
  setNumberEvents: React.Dispatch<React.SetStateAction<number>>;
}

const EventsFeedContainer = ({ username, setNumberEvents }: Props) => {
  const params = useParams();

  const fetchData = async () => {
    const response = await axios.get(`${API_URL}/events/pages/${username}`, {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });

    setNumberEvents(response.data.number_events as number);

    // Convert response to number
    return response.data.pages * 1;
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
    <div className="h-[800px]">
      {username && <EventsFeed username={username} pages={data ? data : 1} />}
    </div>
  );
};

export default EventsFeedContainer;
