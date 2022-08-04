import React from "react";
import axios from "axios";
import { EventType } from "../lib/types";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";
import { BsFillCheckCircleFill } from "react-icons/bs";

interface Props {
  event: EventType;
}

const AcceptInviteButton = ({ event }: Props) => {
  const queryClient = useQueryClient();

  const acceptInvite = async () => {
    const { data: response } = await axios.post(
      `${API_URL}/events/invite/accept`,
      {
        event: event,
      },
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { mutate, isLoading } = useMutation(acceptInvite, {
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["pending-events"]);
      queryClient.invalidateQueries([`guests:${event?.objectId}`]);
    },
  });
  return (
    <button
      className=" bg-green-100 w-[30px] rounded-md p-2"
      onClick={() => mutate()}
    >
      <BsFillCheckCircleFill className="text-green-700" />
    </button>
  );
};

export default AcceptInviteButton;
