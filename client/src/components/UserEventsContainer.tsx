import { EventFeedType } from "../lib/types";
import { API_URL, SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading/Loading";
import React from "react";
import { EventFeedContainer } from "./EventFeedContainer";

interface Props {
  username: string;
  page: number;
}

const UserEventsContainer = ({ username, page }: Props) => {
  const fetchPages = async () => {
    const response = await axios.get(`${API_URL}/events/${username}/${page}`, {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const { isLoading, error, data } = useQuery<EventFeedType[]>(
    [`events-${username}-${page}`],
    fetchPages
  );

  if (isLoading) {
    return (
      <div className="bg-gray-100 h-[600px] w-[850px] m-auto">
        <Loading />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gray-100 h-[600px] w-[850px] mx-auto text-center pt-[250px] text-3xl">
        <h1 className=""> No events yet...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 h-[600px] w-[850px] m-auto p-5">
      <div className="mt-5">
        {data?.map((item, index) => (
          <React.Fragment key={index}>
            <EventFeedContainer
              event={item.event}
              username={username}
              page={page}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default UserEventsContainer;
