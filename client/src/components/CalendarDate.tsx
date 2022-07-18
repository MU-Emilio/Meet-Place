import { startOfDay, format, isEqual } from "date-fns";
import React, { useEffect, useMemo } from "react";
import Event from "./Event";
import { EventType } from "../lib/types";

interface Props {
  date: Date;
  startDate: Date;
  events: { [key: string]: EventType[] };
}

const styles = {
  today: {
    color: "blue",
  },
  notToday: {
    color: "black",
  },
};

const CalendarDate = ({ date, startDate, events }: Props) => {
  const today = format(date, "yyyy-MM-dd");

  const insertEvent = () => {
    const day_events: React.ReactNode[] = [];
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

  useEffect(() => {
    insertEvent();
  }, [events]);

  const dayEvents = useMemo(() => insertEvent(), [events]);

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
        {dayEvents}
      </div>
    </div>
  );
};

export default CalendarDate;
