import React, { useState } from "react";
import { User } from "../lib/types";
import AddGuestButton from "./AddGuestButton";
import DeleteGuestButton from "./DeleteGuestButton";
import FormGuestsList from "./FormGuestsList";

interface Props {
  friends: User[];
}

const EventGuestsField = ({ friends }: Props) => {
  const [addedGuests, setAddedGuests] = useState<User[]>([]);
  const [notAddedGuests, setNotAddedGuests] = useState<User[]>(friends);

  const handleAddGuest = (user: User) => {
    setAddedGuests((prev) => [...prev, user]);
    setNotAddedGuests((prev) => [...prev.filter((data) => data != user)]);
  };

  const handleDeleteGuest = (user: User) => {
    setAddedGuests((prev) => [...prev.filter((data) => data != user)]);
    setNotAddedGuests((prev) => [...prev, user]);
  };

  return (
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
  );
};

export default EventGuestsField;
