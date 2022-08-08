import { useEffect, useState } from "react";
import { User, EventForm } from "../lib/types";
import AddGuestButton from "./AddGuestButton";
import DeleteGuestButton from "./DeleteGuestButton";
import FormGuestsList from "./FormGuestsList";
import AddAvaiableFriends from "./AddAvailableFriends";
import SuggestedDate from "./SuggestedDate";

interface Props {
  friends: User[];
  data: EventForm;
}

const EventGuestsField = ({ friends, data }: Props) => {
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
    <div className="m-auto w-fit">
      <div className="mt-8 mb-8 h-[110px]">
        <SuggestedDate data={data} addedGuests={addedGuests} />
      </div>
      <div className="mb-5">
        <hr className="border-2 mb-2" />
        <AddAvaiableFriends
          data={data}
          handleAddArrayGuests={handleAddArrayGuests}
        />
        <hr className="border-2 mt-2" />
      </div>

      <div className="">
        <div className="flex justify-around w-[500px]">
          <div className="w-[300px] m-auto border-2">
            <div className="bg-secundary text-white px-3 py-1 font-medium">
              <p>Not Added</p>
            </div>
            <div className="h-[200px] overflow-y-auto px-2">
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
          </div>

          <div className="w-[300px] m-auto border-2">
            <div className="bg-secundary text-white px-3 py-1 font-medium">
              <p>Not Added</p>
            </div>
            <div className="h-[200px] overflow-y-auto px-2">
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
        </div>
      </div>
    </div>
  );
};

export default EventGuestsField;
