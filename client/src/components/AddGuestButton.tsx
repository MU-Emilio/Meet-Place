import React from "react";
import axios from "axios";
import { User } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  userCard: User;
  handleAddGuest: (user: User) => void;
}

const AddGuestButton = ({ userCard, handleAddGuest }: Props) => {
  return (
    <button
      className=" bg-green-200 rounded-sm text-xs h-fit px-2 py-1"
      onClick={() => handleAddGuest(userCard)}
    >
      Add Guest
    </button>
  );
};

export default AddGuestButton;
