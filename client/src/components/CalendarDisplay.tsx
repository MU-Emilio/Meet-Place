import React, { useMemo } from "react";
import { WEEK_DAYS } from "../lib/constants";
import { MonthContainer } from "./MonthContainer";
import { WeekContainer } from "./WeekContainer";
import { EventType } from "../lib/types";

// Styles
const styles = {
  calendar: {
    display: "grid",
    gridTemplateColumns: "repeat(7, minmax(200px, 300px))",
  },
};

interface Props {
  startDate: Date;
  monthView: boolean;
  calendarDate: Date;
  events: { [key: string]: EventType[] };
}

const CalendarDisplay = ({
  startDate,
  monthView,
  calendarDate,
  events,
}: Props) => {
  const renderDayNames = () => {
    const day_names: React.ReactNode[] = [];

    WEEK_DAYS.map((name, index) => {
      day_names.push(
        <React.Fragment key={index}>
          <p className=" font-medium border h-10 w-full px-1 bg-secundary opacity-80 text-center py-2">
            {name}
          </p>
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
    <div style={styles.calendar} className="shadow-lg">
      <>
        {dayNames}
        {calendar}
      </>
    </div>
  );
};

export default CalendarDisplay;
