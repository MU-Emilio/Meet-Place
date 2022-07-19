import { EventType } from "../../lib/types";
import "./EventPopover.css";

interface Props {
  event: EventType | null;
  isHover: boolean;
}

const EventPopover = ({ event, isHover }: Props) => {
  return (
    <div className={`eventPop ${isHover ? "fadeIn" : "fadeOut"}`}>
      <h1>{event?.title}</h1>
      <hr />
      <p>Date: {event?.date.iso}</p>
      <p>{event?.description}</p>
    </div>
  );
};

export default EventPopover;
