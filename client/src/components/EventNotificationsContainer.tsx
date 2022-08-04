import React from "react";
import EventNotificationsPopover from "./EventNotificationsPopover/EventNotificationsPopover";

interface Props {
  notificationIsOpen: boolean;
  handleClickNotifications: () => void;
}

const EventNotificationsContainer = ({
  notificationIsOpen,
  handleClickNotifications,
}: Props) => {
  return (
    <EventNotificationsPopover
      notificationIsOpen={notificationIsOpen}
      handleClickNotifications={handleClickNotifications}
    />
  );
};

export default EventNotificationsContainer;
