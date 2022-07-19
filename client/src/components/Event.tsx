import { EventType } from "../lib/types";

interface Props {
  event: EventType;
  setEventHover: (eventHover: EventType | null) => void;
}

const Event = ({ event, setEventHover }: Props) => {
  return (
    <div
      onMouseEnter={() => setEventHover(event)}
      onMouseLeave={() => setEventHover(null)}
      className="cursor-pointer bg-green-200 border border-green-300 flex justify-between mb-2"
    >
      <p>{event.title}</p>
      <p className=" text-xs">{event.date.iso.split("T")[1].split(".")[0]}</p>
    </div>
  );
};

export default Event;
