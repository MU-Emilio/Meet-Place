import { startOfDay, format, isEqual } from "date-fns";
import React from "react";
import Event from "./Event";
import { useQuery } from "react-query";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { User } from "../lib/types";

interface Props {
  date: Date;
  startDate: Date;
  events: any;
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
  // const isUserEvent = async (event: any) => {
  //   const eventId = event.objectId;

  //   const { isLoading, error, data } = useQuery<any>(["guests"], async () => {
  //     const response = await axios.get(
  //       `http://localhost:3001/events/${eventId}`
  //     );
  //     return response.data;
  //   });

  //   if (!isLoading && data) {
  //     data.map((eventUser: any) => {
  //       console.log(eventUser.guest.objectId);
  //       console.log(eventUser.guest.objectId == user.objectId);
  //       if (eventUser.guest.objectId == user.objectId) {
  //         return true;
  //       }
  //     });
  //   }
  //   return false;
  // };

  // const isToday = (event: any) => {
  //   const event_date = new Date(event.date.iso);
  //   return isEqual(startOfDay(date), startOfDay(event_date));
  // };

  const insertEvent = () => {
    const day_events: React.ReactNode[] = [];
    const today = format(date, "yyyy,MM,dd");
    if (events[today]) {
      events[today].map((event: any, event_index: number) => {
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
