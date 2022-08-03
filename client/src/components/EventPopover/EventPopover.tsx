import { EventType, User } from "../../lib/types";
import "./EventPopover.css";
import axios from "axios";
import { SESSION_KEY } from "../../lib/constants";
import { useQuery } from "react-query";
import GuestContainer from "../GuestContainer";
import { useMutation, useQueryClient } from "react-query";
import {
  BiTrash,
  BiCalendar,
  BiCurrentLocation,
  BiComment,
} from "react-icons/bi";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../lib/constants";
import Loading from "../Loading/Loading";

interface Props {
  event: EventType | null;
  isHover: boolean;
}

const EventPopover = ({ event, isHover }: Props) => {
  const navigate = useNavigate();

  const deleteEvent = async () => {
    const { data: response } = await axios.post(
      `${API_URL}/events/delete`,
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
    const response = await axios.get(`${API_URL}/user/viewer`, {
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
    viewerIsLoading && <Loading />;
  }

  const formatDate = (date: string) => {
    const splited = date.split("T");
    return format(new Date(`${splited[0]}T10:00:00.000Z`), "MMMMMM, dd");
  };

  if (!event) {
    return null;
  }

  return (
    <div className={`eventPop ${isHover ? "fadeIn" : "fadeOut"} rounded-md`}>
      <div className="flex justify-between bg-blue-500 text-white font-medium items-center p-2 rounded-t-md">
        <h1
          className="cursor-pointer"
          onClick={() => navigate(`/event/${event.objectId}`)}
        >
          {event.title}
        </h1>
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
          <GuestContainer event={event} horizontal={true} />
        </div>
      </div>
    </div>
  );
};

export default EventPopover;
