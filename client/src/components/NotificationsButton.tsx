import React, { useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import EventNotificationsContainer from "./EventNotificationsContainer";
import { useDetectClickOutside } from "react-detect-click-outside";

const NotificationsButton = () => {
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setNotificationIsOpen(false);
    },
  });

  const handleClickNotifications = () => {
    setNotificationIsOpen(!notificationIsOpen);
  };

  return (
    <div ref={ref} className="w-[30px] relative">
      <button
        className={` h-full w-[30px] cursor-pointer p-1 rounded-md shadow-md hover:scale-105 ease-in-out duration-300 items-center flex justify-around ${
          notificationIsOpen ? "bg-secundary text-white" : "bg-gray-200"
        }`}
        onClick={handleClickNotifications}
      >
        <IoNotificationsSharp />
      </button>
      <EventNotificationsContainer
        notificationIsOpen={notificationIsOpen}
        handleClickNotifications={handleClickNotifications}
      />
    </div>
  );
};

export default NotificationsButton;
