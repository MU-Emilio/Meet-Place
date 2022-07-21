import React from "react";
import axios from "axios";
import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  userCard: User;
}

const DeleteFriendButton = ({ userCard }: Props) => {
  const queryClient = useQueryClient();

  const deleteFriend = async () => {
    const { data: response } = await axios.post(
      "http://localhost:3001/deleteFriend",
      {
        userCard: userCard,
      },
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { mutate, isLoading } = useMutation(deleteFriend, {
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["friends"]);
      queryClient.invalidateQueries(["users"]);
    },
  });

  return (
    <button
      className=" bg-red-200 rounded-sm text-xs h-fit px-2 py-1"
      onClick={() => mutate()}
    >
      Delete
    </button>
  );
};

export default DeleteFriendButton;
