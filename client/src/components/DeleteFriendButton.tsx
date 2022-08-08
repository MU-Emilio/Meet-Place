import React from "react";
import axios from "axios";
import { User } from "../lib/types";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";
import Loading from "./Loading/Loading";

interface Props {
  userCard: User;
}

const DeleteFriendButton = ({ userCard }: Props) => {
  const queryClient = useQueryClient();

  const deleteFriend = async () => {
    const { data: response } = await axios.post(
      `${API_URL}/friends/deleteFriend`,
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
    <div>
      {isLoading && <Loading />}
      <button
        className=" bg-red-200 rounded-sm text-xs h-fit px-2 py-1 cursor-pointer hover:scale-105 ease-in-out duration-300"
        onClick={() => mutate()}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteFriendButton;
