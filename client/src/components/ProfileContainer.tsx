import axios from "axios";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { User } from "../lib/types";
import Profile from "./Profile";
import { useParams } from "react-router-dom";
import EventsFeedContainer from "./EventsFeedContainer";
import { useState } from "react";

export const ProfileContainer = () => {
  const params = useParams();

  const [numberEvents, setNumberEvents] = useState(0);

  const fetchViewer = async () => {
    const response = await axios.get(`${API_URL}/user/viewer`, {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataViewer,
  } = useQuery<User | null>(["user"], fetchViewer);

  const fetchData = async () => {
    const response = await axios.get(
      `${API_URL}/user/username/${params.username}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User | null>(
    [`user-${params.username}`],
    fetchData
  );

  if (isLoading || isLoadingUser) {
    return <Loading />;
  }

  if (error instanceof Error || errorUser instanceof Error) {
    return <p>{`An error has occurred: ${error.message}`}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex justify-around">
      <Profile user={data} numberEvents={numberEvents} />
      {dataViewer && (
        <EventsFeedContainer
          username={params.username}
          setNumberEvents={setNumberEvents}
        />
      )}
    </div>
  );
};
