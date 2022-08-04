import React from "react";
import axios from "axios";
import { EventType } from "../lib/types";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";
import { BsXCircleFill } from "react-icons/bs";

interface Props {
  event: EventType;
}

const RejectInviteButton = ({ event }: Props) => {
  const queryClient = useQueryClient();

  const rejectInvite = async () => {
    const { data: response } = await axios.post(
      `${API_URL}/events/invite/reject`,
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

  const { mutate, isLoading } = useMutation(rejectInvite, {
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
      className=" bg-red-100 w-[30px] rounded-md p-2"
      onClick={() => mutate()}
    >
      <BsXCircleFill className=" text-red-700" />
    </button>
  );
};

export default RejectInviteButton;
