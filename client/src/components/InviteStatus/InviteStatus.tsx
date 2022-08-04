import React, { useState } from "react";
import MessagePop from "../MessagePop";
import "./InviteStatus.css";
import {
  BsQuestionCircleFill,
  BsFillCheckCircleFill,
  BsXCircleFill,
} from "react-icons/bs";

interface Props {
  status: string;
}

const InviteStatus = ({ status }: Props) => {
  const [isHover, setIsHover] = useState(false);

  if (status === "accepted") {
    return (
      <div
        className="bg-white rounded-2xl status"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <BsFillCheckCircleFill className=" text-green-500" />
        <MessagePop isHover={isHover} message={"Going"} />
      </div>
    );
  } else if (status === "pending") {
    return (
      <div
        className="bg-white rounded-2xl status"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <BsQuestionCircleFill className=" text-yellow-500" />
        <div className="status-message relative">
          <MessagePop isHover={isHover} message={"Pending"} />
        </div>
      </div>
    );
  } else if (status === "rejected") {
    return (
      <div
        className="bg-white rounded-2xl status"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <BsXCircleFill className=" text-red-500" />
        <MessagePop isHover={isHover} message={"Not going"} />
      </div>
    );
  }

  return <div className=""></div>;
};

export default InviteStatus;
