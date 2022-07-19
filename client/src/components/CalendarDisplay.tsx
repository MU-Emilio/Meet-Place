import React, { useMemo } from "react";
import { WEEK_DAYS } from "../lib/constants";
import { MonthContainer } from "./MonthContainer";
import { WeekContainer } from "./WeekContainer";
import { EventType } from "../lib/types";

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
  events: { [key: string]: EventType[] };
  eventHover: EventType | null;
  setEventHover: (eventHover: EventType | null) => void;
}

const CalendarDisplay = ({
  startDate,
  monthView,
  calendarDate,
  events,
  eventHover,
  setEventHover,
}: Props) => {
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
          eventHover={eventHover}
          setEventHover={setEventHover}
        />
      );
    } else {
      return (
        <WeekContainer
          startDate={startDate}
          calendarDate={calendarDate}
          events={events}
          eventHover={eventHover}
          setEventHover={setEventHover}
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
