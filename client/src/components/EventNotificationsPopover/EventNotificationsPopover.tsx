import React from "react";
import "./EventNotificationsPopover.css";

const EventNotificationsPopover = () => {
  return (
    <div
      className={`eventPop ${
        true ? "fadeIn" : "fadeOut"
      } rounded-md bg-yellow-200`}
    >
      EventNotificationsPopover
    </div>
  );
};

export default EventNotificationsPopover;
