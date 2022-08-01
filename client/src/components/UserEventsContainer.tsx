import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading";
import React from "react";
import { EventFeedContainer } from "./EventFeedContainer";

interface Props {
  userId: string;
  page: number;
}

const UserEventsContainer = ({ userId, page }: Props) => {
  const fetchPages = async () => {
    const response = await axios.get(
      `http://localhost:3001/events/${userId}/${page - 1}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<any[]>(
    [`events-${page}`],
    fetchPages
  );

  if (isLoading || !data) {
    return (
      <div className="bg-gray-300 h-[600px] w-[950px] m-auto">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gray-300 h-[600px] w-[950px] m-auto p-5">
      <h1>Events:</h1>
      <div className="mt-5">
        {data?.map((item, index) => (
          <React.Fragment key={index}>
            <EventFeedContainer event={item.event} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default UserEventsContainer;
