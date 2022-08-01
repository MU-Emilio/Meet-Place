import { EventType, User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading";
import React from "react";
import EventFeedCard from "./EventFeedCard";

interface Props {
  event: EventType;
  username: string;
  page: number;
}

export const EventFeedContainer = ({ event, username, page }: Props) => {
  const fetchOwner = async () => {
    const response = await axios.get(
      `http://localhost:3001/owner/${event.owner.objectId}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const {
    isLoading,
    error,
    data: owner,
  } = useQuery<User>([`owner-${event.owner.objectId}}`], fetchOwner);

  if (isLoading || error) {
    return (
      <div className=" m-auto bg-white w-[800px] h-[230px] mt-2">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <EventFeedCard
        event={event}
        owner={owner}
        username={username}
        page={page}
      />
    </div>
  );
};
