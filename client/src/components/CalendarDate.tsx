import { startOfDay, format, isEqual } from "date-fns";
import React from "react";
import Event from "./Event";
import { User, EventType } from "../lib/types";

interface Props {
  date: Date;
  startDate: Date;
  events: { [key: string]: EventType[] };
  user: User;
}

const styles = {
  today: {
    color: "blue",
  },
  notToday: {
    color: "black",
  },
};

const CalendarDate = ({ date, startDate, events, user }: Props) => {
  const insertEvent = () => {
    const day_events: React.ReactNode[] = [];
    const today = format(date, "yyyy-MM-dd");
    if (events[today]) {
      events[today].map((event: EventType, event_index: number) => {
        day_events.push(
          <React.Fragment key={`${today}-${event_index}`}>
            <Event event={event} />
          </React.Fragment>
        );
      });
    }
    return day_events;
  };

  return (
    <div>
      <div
        className="border h-24 px-1 pb-4"
        style={
          isEqual(startOfDay(date), startOfDay(startDate))
            ? styles.today
            : styles.notToday
        }
      >
        {format(date, "dd")}
        {insertEvent()}
      </div>
    </div>
  );
};

export default CalendarDate;
