import { EventType, User } from "../../lib/types";
import "./EventPopover.css";
import axios from "axios";
import { SESSION_KEY } from "../../lib/constants";
import { useQuery } from "react-query";
import GuestList from "../GuestList";
import { useMutation, useQueryClient } from "react-query";
import {
  BiTrash,
  BiCalendar,
  BiCurrentLocation,
  BiComment,
} from "react-icons/bi";
import { format } from "date-fns";

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

  const fetchViewer = async () => {
    const response = await axios.get("http://localhost:3001/viewer", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const {
    isLoading: viewerIsLoading,
    error: viewerError,
    data: viewer,
  } = useQuery<User | null>(["user"], fetchViewer);

  const isOwner = (event: EventType | null) => {
    if (event) {
      return viewer?.objectId === event.owner.objectId;
    }
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

  {
    isLoading || (viewerIsLoading && <p>Loading...</p>);
  }

  const formatDate = (date: string) => {
    const splited = date.split("T");
    return format(new Date(splited[0]), "MMMMMM, dd");
  };

  if (!event) {
    return null;
  }

  return (
    <div className={`eventPop ${isHover ? "fadeIn" : "fadeOut"} rounded-md`}>
      <div className="flex justify-between bg-blue-500 text-white font-medium items-center p-2 rounded-t-md">
        <h1>{event.title}</h1>
        {isOwner(event) && (
          <BiTrash onClick={() => mutate()} className="cursor-pointer" />
        )}
      </div>
      <hr />
      <div className="border flex flex-col gap-4 bg-white py-2">
        <div className="flex items-center">
          <BiCalendar className="w-1/6 text-2xl" />
          <p className="w-5/6">{formatDate(event.date.iso)}</p>
        </div>
        <div className="flex items-center">
          <BiComment className="w-1/6 text-2xl" />
          <p className="w-5/6">{event?.description}</p>
        </div>
        <div className="flex items-center gap-0">
          <BiCurrentLocation className=" w-1/6 text-2xl" />
          <p className=" w-5/6">{event?.location}</p>
        </div>
        <div className=" align-bottom">
          {isLoading || !data ? (
            <p>Loading...</p>
          ) : (
            <GuestList guests={data} horizontal={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPopover;
