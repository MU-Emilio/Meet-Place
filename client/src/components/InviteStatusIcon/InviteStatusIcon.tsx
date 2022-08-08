import { useState } from "react";
import MessagePop from "../MessagePop";
import "./InviteStatusIcon.css";

interface Props {
  message: string;
  icon: React.ReactNode;
}

const InviteStatusIcon = ({ message, icon }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl status"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {icon}
      <div className="status-message relative">
        <MessagePop isHover={isHover} message={message} />
      </div>
    </div>
  );
};

export default InviteStatusIcon;
