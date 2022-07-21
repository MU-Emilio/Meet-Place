import React, { useState } from "react";
import { User, EventForm } from "../lib/types";
import AddGuestButton from "./AddGuestButton";
import DeleteGuestButton from "./DeleteGuestButton";
import FormGuestsList from "./FormGuestsList";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Props {
  friends: User[];
  data: EventForm;
  handleNextField: (newData: EventForm, final: boolean) => void;
  handlePrevField: (newData: EventForm) => void;
}

const EventGuestsField = ({
  friends,
  data,
  handleNextField,
  handlePrevField,
}: Props) => {
  const [addedGuests, setAddedGuests] = useState<User[]>([]);
  const [notAddedGuests, setNotAddedGuests] = useState<User[]>(friends);

  const handleAddGuest = (user: User) => {
    if (!data.guests.find((item) => item == user)) {
      setAddedGuests((prev) => [...prev, user]);
      setNotAddedGuests((prev) => [...prev.filter((item) => item != user)]);
      data.guests = [...data.guests, user];
      console.log(data);
    } else {
      setAddedGuests((prev) => [...prev, user]);
      setNotAddedGuests((prev) => [...prev.filter((item) => item != user)]);
      console.log("ya esta");
    }
  };

  const handleDeleteGuest = (user: User) => {
    setAddedGuests((prev) => [...prev.filter((item) => item != user)]);
    setNotAddedGuests((prev) => [...prev, user]);
    data.guests = [...data.guests.filter((item) => item != user)];
    console.log(data);
  };

  return (
    <div className="block">
      <div className="flex justify-around">
        <div>
          <p>Not Added</p>
          <FormGuestsList
            users={notAddedGuests}
            ButtonComponent={(userInfo: User) => (
              <AddGuestButton
                userCard={userInfo}
                handleAddGuest={handleAddGuest}
              />
            )}
          />
        </div>

        <div>
          <p>Added</p>
          <FormGuestsList
            users={addedGuests}
            ButtonComponent={(userInfo: User) => (
              <DeleteGuestButton
                userCard={userInfo}
                handleDeleteButton={handleDeleteGuest}
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-6">
        <button
          type="button"
          className="mt-4"
          onClick={() => handlePrevField(data)}
        >
          Back
        </button>
        <button
          type="button"
          className="mt-4"
          onClick={() => handleNextField(data, false)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventGuestsField;
