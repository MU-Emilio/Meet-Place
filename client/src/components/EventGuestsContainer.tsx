import React from "react";
import FriendsContainer from "./FriendsContainer";
import { Dispatch, SetStateAction } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AddFriendButton from "./AddFriendButton";

import { User, EventForm } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import EventGuestsField from "./EventGuestsField";
import UserList from "./UserList";
import DeleteFriendButton from "./DeleteFriendButton";

interface Props {
  data: EventForm;
  handleNextField: (newData: EventForm, final: boolean) => void;
  handlePrevField: (newData: EventForm) => void;
}

const EventGuestsContainer = ({
  data,
  handleNextField,
  handlePrevField,
}: Props) => {
  const fetchFriends = async () => {
    const response = await axios.get("http://localhost:3001/friends", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const {
    isLoading,
    error,
    data: friends,
  } = useQuery<User[]>(["friends"], fetchFriends);

  return (
    <div className=" w-8/12 m-auto">
      {friends ? (
        <EventGuestsField
          friends={friends}
          data={data}
          handleNextField={handleNextField}
          handlePrevField={handlePrevField}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EventGuestsContainer;
