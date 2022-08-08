import { useState } from "react";
import { EventType, EventTypeStatus } from "../lib/types";
import EventPopover from "./EventPopover/EventPopover";
import { useNavigate } from "react-router-dom";
import CategoryContainer from "./CategoryContainer";

interface Props {
  event: EventTypeStatus;
}

const Event = ({ event }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative"
    >
      <div
        className={`text-sm flex mb-2 hover:scale-105 ease-in-out duration-300 cursor-pointer items-center ${
          event.status == "accepted"
            ? "bg-green-200 border border-green-300 "
            : "bg-yellow-200 border border-yellow-300 "
        }`}
        onClick={() => navigate(`/event/${event.event.objectId}`)}
      >
        <div className="w-[40px]">
          <CategoryContainer
            categoryId={event.event.category.objectId}
            complete={false}
          />
        </div>

        <div className="flex justify-between w-full">
          <p className="text-[13px]">{event.event.title}</p>
          <p className=" text-[9px]">
            {event.event.date.iso.split("T")[1] != "00:00:00.000Z" &&
              `${event.event.date.iso.split("T")[1].split(":")[0]}:${
                event.event.date.iso.split("T")[1].split(":")[1]
              }`}
          </p>
        </div>
      </div>

      <EventPopover event={event} isHover={isHover} />
    </div>
  );
};

export default Event;
