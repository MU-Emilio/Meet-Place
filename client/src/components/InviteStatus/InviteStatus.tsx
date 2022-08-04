import React, { useState } from "react";
import "./InviteStatus.css";
import {
  BsQuestionCircleFill,
  BsFillCheckCircleFill,
  BsXCircleFill,
} from "react-icons/bs";
import InviteStatusIcon from "../InviteStatusIcon/InviteStatusIcon";

interface Props {
  status: string;
}

const InviteStatus = ({ status }: Props) => {
  const [isHover, setIsHover] = useState(false);

  if (status === "accepted") {
    return (
      <InviteStatusIcon
        message={"Going"}
        icon={<BsFillCheckCircleFill className="text-green-500" />}
      />
    );
  } else if (status === "pending") {
    return (
      <InviteStatusIcon
        message={"Pending"}
        icon={<BsQuestionCircleFill className="text-yellow-500" />}
      />
    );
  } else if (status === "rejected") {
    return (
      <InviteStatusIcon
        message={"Not Going"}
        icon={<BsXCircleFill className="text-red-500" />}
      />
    );
  }

  return <div className=""></div>;
};

export default InviteStatus;
