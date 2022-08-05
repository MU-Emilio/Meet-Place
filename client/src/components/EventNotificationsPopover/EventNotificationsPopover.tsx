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
      } rounded-md bg-white border-[1px] border-black p-3 shadow-lg`}
    >
      <div className="h-[470px] overflow-y-auto">
        {pendingEventsComponets.length > 0 ? (
          pendingEventsComponets
        ) : (
          <div className="h-full flex items-center">
            <h3 className="mx-auto text-lg">No notifications yet...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventNotificationsPopover;
