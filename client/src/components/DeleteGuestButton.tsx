import React from "react";
import axios from "axios";
import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  userCard: User;
  handleDeleteButton: (user: User) => void;
}

const DeleteGuestButton = ({ userCard, handleDeleteButton }: Props) => {
  return (
    <button
      className=" bg-red-200 rounded-sm text-xs h-fit px-2 py-1"
      onClick={() => handleDeleteButton(userCard)}
    >
      Delete Guest
    </button>
  );
};

export default DeleteGuestButton;
