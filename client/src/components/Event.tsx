import { useState } from "react";
import { EventType } from "../lib/types";
import EventPopover from "./EventPopover/EventPopover";

interface Props {
  event: EventType;
}

const Event = ({ event }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className=" relative cursor-pointer"
    >
      <div className=" text-sm bg-green-200 border border-green-300 flex justify-between mb-2 hover:scale-105 ease-in-out duration-300">
        <p>{event.title}</p>
        <p className=" text-xs">{event.date.iso.split("T")[1].split(".")[0]}</p>
      </div>

      <EventPopover event={event} isHover={isHover} />
    </div>
  );
};

export default Event;
