import React from "react";

interface Props {
  event: any;
}

const Event = ({ event }: Props) => {
  return <div>{event.title}</div>;
};

export default Event;
