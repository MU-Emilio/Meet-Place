import format from "date-fns/format";
import React from "react";
import Event from "./Event";
import { EventType } from "../lib/types";

interface Props {
  events: { [key: string]: EventType[] };
  date: Date;
}

const EventsContainer = ({ events, date }: Props) => {
  const today = format(date, "yyyy-MM-dd");

  if (!events[today]) {
    return null;
  }

  return (
    <>
      {events[today].map((event: EventType, event_index: number) => {
        return (
          <React.Fragment key={`${today}-${event_index}`}>
            <Event event={event} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default EventsContainer;
