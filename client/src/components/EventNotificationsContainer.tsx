import EventNotificationsPopover from "./EventNotificationsPopover/EventNotificationsPopover";
import axios from "axios";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading/Loading";
import { EventType, User } from "../lib/types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Props {
  notificationIsOpen: boolean;
  handleClickNotifications: () => void;
}

const EventNotificationsContainer = ({
  notificationIsOpen,
  handleClickNotifications,
}: Props) => {
  const fetchEventInvitations = async () => {
    const response = await axios.get(`${API_URL}/events/pending`, {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });

    return response.data;
  };

  const { isLoading, error, data } = useQuery<EventType[]>(
    ["pending-events"],
    fetchEventInvitations
  );

  if (isLoading || data == null) {
    return <Loading />;
  }

  return (
    <EventNotificationsPopover
      notificationIsOpen={notificationIsOpen}
      handleClickNotifications={handleClickNotifications}
      pendingEvents={data}
    />
  );
};

export default EventNotificationsContainer;
