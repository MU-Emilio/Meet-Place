import { startOfDay, format, isEqual } from "date-fns";
import React from "react";
import Event from "./Event";
interface Props {
  date: Date;
  startDate: Date;
  events: any;
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
  const isToday = (event: any) => {
    const event_date = new Date(event.date.iso);
    return isEqual(startOfDay(date), startOfDay(event_date));
  };

  const insertEvent = () => {
    const day_events: React.ReactNode[] = [];
    Object.keys(events).map((item: any, index: any) => {
      events[item].map((event: any, event_index: number) => {
        if (isToday(event)) {
          day_events.push(
            <React.Fragment key={`${item}-${event_index}`}>
              <Event event={event} />
            </React.Fragment>
          );
        }
      });
    });
    return day_events;
  };

  return (
    <div>
      <p
        className="border h-24 px-1 pb-4"
        style={
          isEqual(startOfDay(date), startOfDay(startDate))
            ? styles.today
            : styles.notToday
        }
      >
        {format(date, "dd")}
        {insertEvent()}
      </p>
    </div>
  );
};

export default CalendarDate;
