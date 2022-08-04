import { EventType } from "../../lib/types";
import "./EventNotificationsPopover.css";

interface Props {
  notificationIsOpen: boolean;
  handleClickNotifications: () => void;
  pendingEvents: EventType[];
}

const EventNotificationsPopover = ({
  notificationIsOpen,
  handleClickNotifications,
  pendingEvents,
}: Props) => {
  return (
    <div
      className={`notificationPop ${
        notificationIsOpen ? "fadeIn" : "fadeOut"
      } rounded-md bg-white border-2 border-black`}
    >
      EventNotificationsPopover
    </div>
  );
};

export default EventNotificationsPopover;
