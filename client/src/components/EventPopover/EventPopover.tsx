import { EventType } from "../../lib/types";
import "./EventPopover.css";

interface Props {
  event: EventType | null;
  isHover: boolean;
}

const EventPopover = ({ event, isHover }: Props) => {
  return (
    <div className={`eventPop ${isHover ? "fadeIn" : "fadeOut"}`}>
      {event?.title}
    </div>
  );
};

export default EventPopover;
