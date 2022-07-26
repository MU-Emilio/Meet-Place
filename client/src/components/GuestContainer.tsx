import React from "react";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import GuestList from "./GuestList";
import { useMutation, useQueryClient } from "react-query";
import { EventType, User } from "../lib/types";
import Loading from "./Loading";

interface Props {
  event: EventType;
  horizontal: boolean;
}

const GuestContainer = ({ event, horizontal }: Props) => {
  const fetchGuests = async () => {
    const response = await axios.get(
      `http://localhost:3001/users/invited/${event?.objectId}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User[]>(
    [`guests:${event?.objectId}`],
    fetchGuests
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>{data && <GuestList guests={data} horizontal={horizontal} />}</div>
  );
};

export default GuestContainer;
