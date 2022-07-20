import { EventType, User } from "../../lib/types";
import "./EventPopover.css";
import axios from "axios";
import { SESSION_KEY } from "../../lib/constants";
import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";

interface Props {
  event: EventType | null;
  isHover: boolean;
}

const EventPopover = ({ event, isHover }: Props) => {
  const [guests, setGuests] = useState<User[]>([]);

  const fetchGuests = async () => {
    const response = await axios.get(
      `http://localhost:3001/users/invited/${event?.objectId}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    setGuests(response.data);
    // return response.data;
  };

  useEffect(() => {
    if (isHover) {
      fetchGuests();
    }
  }, [isHover]);

  return (
    <div className={`eventPop ${isHover ? "fadeIn" : "fadeOut"}`}>
      <h1>{event?.title}</h1>
      <hr />
      <p>Date: {event?.date.iso}</p>
      <p>{event?.description}</p>
      <p>Guests:</p>
      {guests &&
        guests.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <p>{item.username}</p>
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default EventPopover;
