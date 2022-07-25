import React from "react";
import { useParams } from "react-router-dom";
import EventDetails from "./EventDetails";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import { EventType } from "../lib/types";

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
    ["event"],
    fetchDetails
  );

  return (
    <div className="h-[800px]">
      <EventDetails />
    </div>
  );
};

export default EventDetailsContainer;
