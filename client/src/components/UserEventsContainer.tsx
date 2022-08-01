import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading";
import React from "react";
import { EventFeedContainer } from "./EventFeedContainer";

interface Props {
  username: string;
  page: number;
}

const UserEventsContainer = ({ username, page }: Props) => {
  const fetchPages = async () => {
    const response = await axios.get(
      `http://localhost:3001/events/${username}/${page - 1}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<any[]>(
    [`events-${username}-${page}`],
    fetchPages
  );

  if (isLoading || !data) {
    return (
      <div className="bg-gray-100 h-[600px] w-[850px] m-auto">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 h-[600px] w-[850px] m-auto p-5">
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
