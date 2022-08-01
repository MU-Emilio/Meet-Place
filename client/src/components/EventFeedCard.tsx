import { EventType, User } from "../lib/types";
import { format } from "date-fns";
import {
  BiTrash,
  BiCalendar,
  BiCurrentLocation,
  BiComment,
  BiUser,
  BiLockOpenAlt,
  BiLockAlt,
} from "react-icons/bi";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

interface Prop {
  event: EventType;
  owner: User | undefined;
}

const EventFeedCard = ({ event, owner }: Prop) => {
  const navigate = useNavigate();

  return (
    <div className=" m-auto bg-white w-[900px] h-[230px] mt-2">
      <div
        className=" bg-blue-500 text-xl text-white font-medium px-3 py-2 cursor-pointer hover:underline ease-in-out duration-300"
        onClick={() => navigate(`/event/${event.objectId}`)}
      >
        <p> {event.title}</p>
      </div>
      <div className="flex justify-around">
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

        <div>
          <h1 className="font-medium text-xl">Owner:</h1>
          {owner && (
            <div className="hover:scale-105 ease-in-out duration-300 mr-2 px-2">
              <UserCard userCard={owner} ButtonComponent={null} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventFeedCard;
