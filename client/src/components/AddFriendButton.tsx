import React from "react";
import axios from "axios";
import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  userCard: User;
}

const AddFriendButton = ({ userCard }: Props) => {
  const queryClient = useQueryClient();

  const addFriend = async () => {
    const { data: response } = await axios.post(
      "http://localhost:3001/addFriend",
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

  const { mutate, isLoading } = useMutation(addFriend, {
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
      className=" bg-green-200 rounded-sm text-xs h-fit px-2 py-1 cursor-pointer hover:scale-105 ease-in-out duration-300"
      onClick={() => mutate()}
    >
      Add
    </button>
  );
};

export default AddFriendButton;
