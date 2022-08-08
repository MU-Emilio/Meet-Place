import { EventType, User } from "../lib/types";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import UserCard from "./UserCard";
import AcceptInviteButton from "./AcceptInviteButton";
import RejectInviteButton from "./RejectInviteButton";
import { useNavigate } from "react-router-dom";

interface Props {
  event: EventType;
  owner: User;
}

const InvitationCard = ({ event, owner }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 h-[120px] shadow-md mb-2 items-center relative">
      <div
        className="bg-secundary px-3 py-1 text-white text-center hover:underline cursor-pointer"
        onClick={() => navigate(`/event/${event.objectId}`)}
      >
        <h3 className=" text-md font-medium ">{event.title}</h3>
      </div>
      <div className="p-2 mx-auto">
        <div className="flex items-center justify-between">
          <UserCard userCard={owner} ButtonComponent={null} status={null} />
          <div className=" w-[100px] h-[30px] flex justify-around">
            <AcceptInviteButton event={event} />
            <RejectInviteButton event={event} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
