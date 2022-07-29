import { User, EventForm } from "../lib/types";
import { SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import EventGuestsField from "./EventGuestsField";

interface Props {
  data: EventForm;
}

const EventGuestsContainer = ({ data }: Props) => {
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
    <div>
      <label className="block text-4xl mx-auto mb-[50px]" htmlFor="description">
        Whos's going?...
      </label>
      {friends ? (
        <EventGuestsField friends={friends} data={data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EventGuestsContainer;
