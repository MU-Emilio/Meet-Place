import { EventType, User } from "../lib/types";
import { format } from "date-fns";
import {
  BiTrash,
  BiCalendar,
  BiCurrentLocation,
  BiComment,
  BiLockOpenAlt,
  BiLockAlt,
} from "react-icons/bi";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";
import CategoryContainer from "./CategoryContainer";

interface Prop {
  event: EventType;
  owner: User | undefined;
  username: string;
  page: number;
}

const EventFeedCard = ({ event, owner, username, page }: Prop) => {
  const navigate = useNavigate();

  const fetchViewer = async () => {
    const response = await axios.get(`${API_URL}/user/viewer`, {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    return response.data;
  };

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataViewer,
  } = useQuery<User | null>(["user"], fetchViewer);

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

  const queryClient = useQueryClient();

  const { mutate, isLoading: deleteLoading } = useMutation(deleteEvent, {
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", `events-${username}-${page}`]);
    },
  });

  const isOwner = (event: EventType | null) => {
    return event && dataViewer?.objectId === event.owner.objectId;
  };

  return (
    <div className=" m-auto bg-white w-[800px] h-[230px] mt-8">
      <div className=" bg-secundary text-xl text-white font-medium px-3 py-2 flex justify-between items-center">
        <p
          className="cursor-pointer hover:underline w-[600px]"
          onClick={() => navigate(`/event/${event.objectId}`)}
        >
          {event.title}
        </p>
        <div className=" text-black w-[100px]">
          <CategoryContainer
            categoryId={event.category.objectId}
            complete={true}
          />
        </div>
        <div className="w-[100px]">
          {isOwner(event) && (
            <div className="ml-auto mr-0 w-fit">
              <BiTrash onClick={() => mutate()} className="cursor-pointer" />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-around">
        {event.privacy ? (
          <div className="w-[400px]">
            <div className="items-center flex gap-3 m-auto h-full">
              <BiLockAlt className=" text-primary w-1/6" />

              <h2 className="text-xl hover:scale-105 ease-in-out duration-300 w-5/6">
                This event is private
              </h2>
            </div>
            <div className="items-center flex gap-3 m-auto">
              <BiComment className=" text-primary w-1/6" />
              <h2
                className="text-xl hover:scale-105 ease-in-out duration-300 w-5/6 cursor-pointer hover:underline"
                onClick={() => navigate(`/event/${event.objectId}`)}
              >
                Click to access event information
              </h2>
            </div>
          </div>
        ) : (
          <div className="w-[400px]">
            <div className="mt-3 items-center flex gap-3 m-auto">
              <BiCalendar className=" text-primary w-1/6" />
              <h2 className="text-xl hover:scale-105 ease-in-out duration-300 w-5/6">
                {format(
                  new Date(`${event.date.iso.split("T")[0]}T10:00:00.000Z`),
                  "MMMMMM, dd"
                )}
              </h2>
            </div>
            <div className="items-center flex gap-3 m-auto">
              <BiCurrentLocation className=" text-primary w-1/6" />
              <h2 className=" text-xl hover:scale-105 ease-in-out duration-300 w-5/6">
                {event.location}
              </h2>
            </div>
            <div className="items-center flex gap-3 m-auto">
              <BiComment className=" text-primary w-1/6" />
              <h2 className="text-xl hover:scale-105 ease-in-out duration-300 w-5/6">
                {event.description}
              </h2>
            </div>
            <div className="items-center flex gap-3 m-auto">
              {event.privacy ? (
                <BiLockAlt className=" text-primary w-1/6" />
              ) : (
                <BiLockOpenAlt className=" text-primary w-1/6" />
              )}
              <h2 className="text-xl hover:scale-105 ease-in-out duration-300 w-5/6">
                {event.privacy ? "Private" : "Public"}
              </h2>
            </div>
          </div>
        )}

        <div>
          <h1 className="font-medium text-xl">Owner:</h1>
          {owner && (
            <div className="hover:scale-105 ease-in-out duration-300 mr-2 px-2">
              <UserCard userCard={owner} ButtonComponent={null} status={null} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventFeedCard;
