import { useState } from "react";
import { EventType, EventTypeStatus } from "../lib/types";
import EventPopover from "./EventPopover/EventPopover";
import { useNavigate } from "react-router-dom";

interface Props {
  event: EventTypeStatus;
}

const Event = ({ event }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  console.log(event);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative"
    >
      <div
        className={`text-sm flex justify-between mb-2 hover:scale-105 ease-in-out duration-300 cursor-pointer ${
          event.status == "accepted"
            ? "bg-green-200 border border-green-300 "
            : "bg-yellow-200 border border-yellow-300 "
        }`}
        onClick={() => navigate(`/event/${event.event.objectId}`)}
      >
        <p>{event.event.title}</p>
        <p className=" text-xs">{`${
          event.event.date.iso.split("T")[1].split(":")[0]
        }:${event.event.date.iso.split("T")[1].split(":")[1]}`}</p>
      </div>

      <EventPopover event={event} isHover={isHover} />
    </div>
  );
};

export default Event;
