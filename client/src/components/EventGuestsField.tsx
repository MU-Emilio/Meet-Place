import { useState } from "react";
import { User, EventForm } from "../lib/types";
import AddGuestButton from "./AddGuestButton";
import DeleteGuestButton from "./DeleteGuestButton";
import FormGuestsList from "./FormGuestsList";
import { format, setHours } from "date-fns";

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
    if (!data.guests.find((item) => item == user)) {
      setAddedGuests((prev) => [...prev, user]);
      setNotAddedGuests((prev) => [...prev.filter((item) => item != user)]);
      data.guests = [...data.guests, user];
    }
  };

  const handleDeleteGuest = (user: User) => {
    setAddedGuests((prev) => [...prev.filter((item) => item != user)]);
    setNotAddedGuests((prev) => [...prev, user]);
    data.guests = [...data.guests.filter((item) => item != user)];
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

      <div className="flex gap-6 m-auto w-fit">
        <p>
          Add all friends available on
          {data.date != "" ? (
            <span className=" text-primary font-medium">
              {" "}
              {format(setHours(new Date(data.date), 10), "MMMMMM, dd")}
            </span>
          ) : (
            "..."
          )}
        </p>
        <button className=" bg-blue-300">Add</button>
      </div>
    </div>
  );
};

export default EventGuestsField;
