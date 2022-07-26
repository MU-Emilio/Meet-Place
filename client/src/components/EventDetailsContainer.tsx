import React from "react";
import { useParams } from "react-router-dom";
import EventDetails from "./EventDetails";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import { EventType, User } from "../lib/types";
import Loading from "./Loading";

const EventDetailsContainer = () => {
  const params = useParams();

  const fetchDetails = async () => {
    const response = await axios.get(
      `http://localhost:3001/event/${params.eventId}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<EventType>(
    [`event-${params.eventId}`],
    fetchDetails
  );

  const fetchGuests = async () => {
    const response = await axios.get(
      `http://localhost:3001/users/invited/${params.eventId}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const {
    isLoading: guestsIsLoading,
    error: guestsError,
    data: guests,
  } = useQuery<User[]>([`guests:${params.eventId}`], fetchGuests);

  if (isLoading && guestsIsLoading) {
    return <Loading />;
  }

  return (
    <div>
      {data && guests ? (
        <div className="h-[800px]">
          <EventDetails event={data} guests={guests} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default EventDetailsContainer;
