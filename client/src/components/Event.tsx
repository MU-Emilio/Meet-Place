import React from "react";

interface Props {
  event: any;
}

const Event = ({ event }: Props) => {
  return (
    <div className=" bg-green-200 border border-green-300">{event.title}</div>
  );
};

export default Event;
