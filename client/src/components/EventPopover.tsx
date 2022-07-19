import { EventType } from "../lib/types";

interface Props {
  eventHover: EventType | null;
  setEventHover: (eventHover: EventType | null) => void;
}

const EventPopover = ({ eventHover, setEventHover }: Props) => {
  if (!eventHover) {
    return null;
  }
  return (
    <div className=" m-auto border h-96 w-3/6">{eventHover?.date.iso}</div>
  );
};

export default EventPopover;
