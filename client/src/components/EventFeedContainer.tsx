import { EventType, User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading";
import React from "react";
import EventFeedCard from "./EventFeedCard";

interface Props {
  event: EventType;
}

export const EventFeedContainer = ({ event }: Props) => {
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
    isLoading: ownerIsLoading,
    error: ownerError,
    data: owner,
  } = useQuery<User>([`owner-${event.owner.objectId}}`], fetchOwner);

  return (
    <div>
      <EventFeedCard event={event} owner={owner} />
    </div>
  );
};
