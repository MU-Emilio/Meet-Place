import React, { useEffect, useMemo, useState } from "react";
import { WEEK_DAYS } from "../utils/constats";
import { MonthContainer } from "./MonthContainer";
import { WeekContainer } from "./WeekContainer";
import axios from "axios";
import { useQuery } from "react-query";
import format from "date-fns/format";

// Styles
const styles = {
  calendar: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 200px)",
  },
};

interface Props {
  startDate: Date;
  monthView: boolean;
  calendarDate: Date;
  events: any;
}

const CalendarDisplay = ({
  startDate,
  monthView,
  calendarDate,
  events,
}: Props) => {
  //   const [events, setEvents]: any = useState({});

  //   const fetchEvents = async () => {
  //     const response = await axios.get("http://localhost:3001/events");
  //     return response.data;
  //   };

  //   const { isLoading, error, data } = useQuery<any>(["events"], fetchEvents);

  //   const manageEvents = () => {
  //     if (data) {
  //       data.map((event: any) => {
  //         const date = event.date.iso.split("T")[0];
  //         const dateSplit = date.split("-");
  //         if (events[dateSplit]) {
  //           events[dateSplit] = [...events[dateSplit], event];
  //         } else {
  //           events[dateSplit] = [event];
  //         }
  //       });
  //     }
  //   };

  //   const renderEvents = () => {
  //     manageEvents();
  //     const events_out: React.ReactNode[] = [];

  //     Object.keys(events).map((item: any, index: any) => {
  //       events[item].map((event: any, event_index: number) => {
  //         events_out.push(
  //           <React.Fragment key={`${item}/${event_index}`}>
  //             <p>{event.title}</p>
  //           </React.Fragment>
  //         );
  //       });
  //     });

  //     console.log("si");
  //     return events_out;
  //   };

  const renderDayNames = () => {
    const day_names: React.ReactNode[] = [];

    WEEK_DAYS.map((name, index) => {
      day_names.push(
        <React.Fragment key={index}>
          <p className="border h-10 px-1 bg-green-200">{name}</p>
        </React.Fragment>
      );
    });
    return day_names;
  };

  const calendar = useMemo(() => {
    if (monthView) {
      return (
        <MonthContainer
          startDate={startDate}
          calendarDate={calendarDate}
          events={events}
        />
      );
    } else {
      return (
        <WeekContainer
          startDate={startDate}
          calendarDate={calendarDate}
          events={events}
        />
      );
    }
  }, [calendarDate, monthView, events]);

  const dayNames = useMemo(() => {
    return renderDayNames();
  }, []);

  return (
    <div style={styles.calendar}>
      <>
        {dayNames}
        {calendar}
      </>
    </div>
  );
};

export default CalendarDisplay;
