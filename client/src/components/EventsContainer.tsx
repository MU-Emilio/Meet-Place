import format from "date-fns/format";
import React from "react";
import Event from "./Event";
import { EventType } from "../lib/types";
import MoreEventsMessage from "./MoreEventsMessage";

interface Props {
  events: { [key: string]: EventType[] };
  date: Date;
  complete: boolean;
}

const EventsContainer = ({ events, date, complete }: Props) => {
  const today = format(date, "yyyy-MM-dd");

  if (!events[today]) {
    return null;
  }

  // Week view
  if (complete) {
    return (
      <div className="h-full overflow-y-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
        {events[today].map((event: EventType, event_index: number) => {
          return (
            <React.Fragment key={`${today}-${event_index}`}>
              <Event event={event} />
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // Month view

  if (events[today].length > 2) {
    return (
      <>
        <React.Fragment key={`${today}-${0}`}>
          <Event event={events[today][0]} />
        </React.Fragment>
        <MoreEventsMessage eventsLeft={events[today].length - 1} />
      </>
    );
  } else {
    return (
      <>
        {events[today]
          .slice(0, 2)
          .map((event: EventType, event_index: number) => {
            return (
              <React.Fragment key={`${today}-${event_index}`}>
                <Event event={event} />
              </React.Fragment>
            );
          })}
      </>
    );
  }
};

export default EventsContainer;
