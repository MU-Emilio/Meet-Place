import React from "react";
import { User } from "../lib/types";
import { EventType } from "../lib/types";
import InvitationCard from "./InvitationCard";
import axios from "axios";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import Loading from "./Loading/Loading";

interface Props {
  event: EventType;
}

const InvitationCardContainer = ({ event }: Props) => {
  const fetchOwner = async () => {
    const response = await axios.get(
      `${API_URL}/user/owner/${event.owner.objectId}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const {
    isLoading,
    error,
    data: owner,
  } = useQuery<User>([`owner-${event.owner.objectId}}`], fetchOwner);

  if (isLoading || owner == null) {
    return <Loading />;
  }
  return <InvitationCard event={event} owner={owner} />;
};

export default InvitationCardContainer;
