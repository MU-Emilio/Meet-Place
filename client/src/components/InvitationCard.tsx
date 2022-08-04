import { EventType, User } from "../lib/types";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import UserCard from "./UserCard";

interface Props {
  event: EventType;
  owner: User;
}

const InvitationCard = ({ event, owner }: Props) => {
  return (
    <div className="bg-gray-50 h-[120px] shadow-md  items-center">
      <div className="bg-secundary px-3 py-1 text-white text-center">
        <h3 className=" text-md font-medium w-[180px]">{event.title}</h3>
      </div>
      <div className="p-2 mx-auto">
        <div className="flex items-center justify-between">
          <UserCard userCard={owner} ButtonComponent={null} status={null} />
          <div className=" w-[100px] h-[30px] flex justify-around">
            <button className=" bg-green-100 w-[30px] rounded-md p-2">
              <BsFillCheckCircleFill className="text-green-700" />
            </button>
            <button className=" bg-red-100 w-[30px] rounded-md p-2">
              <BsXCircleFill className=" text-red-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
