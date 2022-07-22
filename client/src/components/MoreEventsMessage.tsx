import React, { useState } from "react";
import MessagePop from "./MessagePop";

interface Props {
  eventsLeft: number;
}

const MoreEventsMessage = ({ eventsLeft }: Props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative"
    >
      <div className=" bg-green-200 border border-green-300 flex justify-between mb-2 cursor-pointer">
        <p>...</p>
      </div>
      <MessagePop isHover={isHover} message={`${eventsLeft} more...`} />
    </div>
  );
};

export default MoreEventsMessage;
