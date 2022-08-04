import { EventType } from "../../lib/types";
import React, { useMemo } from "react";
import "./EventNotificationsPopover.css";
import InvitationCardContainer from "../InvitationCardContainer";

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
  const pendingEventsComponets = useMemo(() => {
    return pendingEvents.map((item, index) => (
      <React.Fragment key={index}>
        <InvitationCardContainer event={item} />
      </React.Fragment>
    ));
  }, [pendingEvents]);

  return (
    <div
      className={`notificationPop ${
        notificationIsOpen ? "fadeIn" : "fadeOut"
      } rounded-md bg-white border-2 border-black p-3`}
    >
      <div className="h-[470px] overflow-y-auto">{pendingEventsComponets}</div>
    </div>
  );
};

export default EventNotificationsPopover;
