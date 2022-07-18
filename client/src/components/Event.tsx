import { EventType } from "../lib/types";
import { format } from "date-fns";

interface Props {
  event: EventType;
}

const Event = ({ event }: Props) => {
  return (
    <div className=" bg-green-200 border border-green-300 flex justify-between">
      <p>{event.title}</p>
      <p className=" text-xs">{event.date.iso.split("T")[1].split(".")[0]}</p>
    </div>
  );
};

export default Event;
