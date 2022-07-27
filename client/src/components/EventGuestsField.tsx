import { useEffect, useState } from "react";
import { User, EventForm } from "../lib/types";
import { useQueryClient } from "react-query";
import AddGuestButton from "./AddGuestButton";
import DeleteGuestButton from "./DeleteGuestButton";
import FormGuestsList from "./FormGuestsList";
import AddAvaiableFriends from "./AddAvailableFriends";

interface Props {
  friends: User[];
  data: EventForm;
  dateState: string;
}

const EventGuestsField = ({ friends, data, dateState }: Props) => {
  const [addedGuests, setAddedGuests] = useState<User[]>(data.guests);
  const [notAddedGuests, setNotAddedGuests] = useState<User[]>(
    friends.filter((item) => !data.guests.includes(item))
  );

  const handleAddGuest = (user: User) => {
    if (!data.guests.find((item) => item.objectId == user.objectId)) {
      setAddedGuests([...data.guests, user]);
      setNotAddedGuests((prev) => [
        ...prev.filter((item) => item.objectId != user.objectId),
      ]);
      data.guests = [...data.guests, user];
    }
  };

  const handleDeleteGuest = (user: User) => {
    setAddedGuests((prev) => [...prev.filter((item) => item != user)]);
    setNotAddedGuests((prev) => [...prev, user]);
    data.guests = [...data.guests.filter((item) => item != user)];
  };

  const handleAddArrayGuests = (availableFriends: User[]) => {
    availableFriends.map((guest) => {
      handleAddGuest(guest);
    });
  };

  useEffect(() => {
    addedGuests.map((friend) => {
      setNotAddedGuests((prev) => [
        ...prev.filter((item) => item.objectId != friend.objectId),
      ]);
    });
  }, [data]);

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

      <AddAvaiableFriends
        data={data}
        handleAddArrayGuests={handleAddArrayGuests}
      />
    </div>
  );
};

export default EventGuestsField;
