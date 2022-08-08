import axios from "axios";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useQuery } from "react-query";
import GuestList from "./GuestList";
import { EventType, User, Guest, EventTypeStatus } from "../lib/types";
import Loading from "./Loading/Loading";

interface Props {
  event: EventType;
  horizontal: boolean;
}

const GuestContainer = ({ event, horizontal }: Props) => {
  const fetchGuests = async () => {
    const response = await axios.get(
      `${API_URL}/guests/invited/${event?.objectId}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<Guest[]>(
    [`guests:${event?.objectId}`],
    fetchGuests
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>{data && <GuestList guests={data} horizontal={horizontal} />}</div>
  );
};

export default GuestContainer;
