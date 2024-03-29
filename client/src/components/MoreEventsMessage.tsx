import React, { useState } from "react";
import MessagePop from "./MessagePop";

interface Props {
  eventsLeft: number;
  changeDisplay: () => void;
}

const MoreEventsMessage = ({ eventsLeft, changeDisplay }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => changeDisplay()}
      className="relative"
    >
      <div className="text-sm bg-green-200 border border-green-300 flex justify-between mb-2 cursor-pointer">
        <p>...</p>
      </div>
      <MessagePop isHover={isHover} message={`${eventsLeft} more...`} />
    </div>
  );
};

export default MoreEventsMessage;
