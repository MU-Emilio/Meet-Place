import React from "react";
import { useParams } from "react-router-dom";

const EventDetailsContainer = () => {
  const params = useParams();

  return (
    <div className="h-[800px]">EventDetailsContainer {params.eventId}</div>
  );
};

export default EventDetailsContainer;
