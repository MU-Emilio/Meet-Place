import { EventType, User } from "../../lib/types";
import "./EventPopover.css";
import axios from "axios";
import { SESSION_KEY } from "../../lib/constants";
import { useQuery } from "react-query";
import GuestList from "../GuestList";
import { useMutation, useQueryClient } from "react-query";
interface Props {
  event: EventType | null;
  isHover: boolean;
}

const EventPopover = ({ event, isHover }: Props) => {
  const fetchGuests = async () => {
    const response = await axios.get(
      `http://localhost:3001/users/invited/${event?.objectId}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { isLoading, error, data } = useQuery<User[]>(
    [`guests:${event?.objectId}`],
    fetchGuests
  );

  const deleteEvent = async () => {
    const { data: response } = await axios.post(
      "http://localhost:3001/event/delete",
      {
        event: event,
      },
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading: deleteLoading } = useMutation(deleteEvent, {
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  return (
    <div className={`eventPop ${isHover ? "fadeIn" : "fadeOut"}`}>
      <div className="flex justify-between">
        <h1>{event?.title}</h1>
        <button className=" bg-red-300" onClick={() => mutate()}>
          Delete
        </button>
      </div>
      <hr />
      <p>Date: {event?.date.iso}</p>
      <p>{event?.description}</p>
      <p>Guests:</p>

      {isLoading || !data ? <p>Loading...</p> : <GuestList guests={data} />}
    </div>
  );
};

export default EventPopover;
