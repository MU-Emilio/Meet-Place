import React, { useMemo } from "react";
import { WEEK_DAYS } from "../utils/constats";
import { MonthContainer } from "./MonthContainer";
import { WeekContainer } from "./WeekContainer";

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
}

const CalendarDisplay = ({ startDate, monthView, calendarDate }: Props) => {
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
        <MonthContainer startDate={startDate} calendarDate={calendarDate} />
      );
    } else {
      return (
        <WeekContainer startDate={startDate} calendarDate={calendarDate} />
      );
    }
  }, [calendarDate, monthView]);

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
