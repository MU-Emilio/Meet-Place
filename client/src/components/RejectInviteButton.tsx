import React, { useState } from "react";
import axios from "axios";
import { EventType } from "../lib/types";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";
import { BsXCircleFill } from "react-icons/bs";
import Loading from "./Loading/Loading";
import MessagePop from "../components/MessagePop";

interface Props {
  event: EventType;
}

const RejectInviteButton = ({ event }: Props) => {
  const queryClient = useQueryClient();

  const [isHover, setIsHover] = useState(false);

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
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative"
    >
      {isLoading && <Loading />}
      <button
        className=" bg-red-100 w-[30px] rounded-md p-2 hover:scale-105 ease-in-out duration-300"
        onClick={() => mutate()}
      >
        <BsXCircleFill className=" text-red-700" />
      </button>

      <MessagePop isHover={isHover} message={"Reject"} />
    </div>
  );
};

export default RejectInviteButton;
