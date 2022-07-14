import { startOfMonth, startOfWeek, format } from "date-fns";
import { addMonths } from "date-fns/esm";
import React, { useState, useMemo } from "react";
import { generateMonth, generateWeek } from "../utils/calendar_utils";
// import generateWeek from "../utils/calendar_utils";
import CalendarDate from "./CalendarDate";

// Styles
const styles = {
  calendar: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 200px)",
  },
};

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  calendarDate: Date;
  setCalendarDate: (date: Date) => void;
  monthView: boolean;
}

const CalendarDisplay = ({
  selectedDate,
  setSelectedDate,
  startDate,
  setStartDate,
  calendarDate,
  setCalendarDate,
  monthView,
}: Props) => {
  const renderMonth = (calendarDate: Date) => {
    const monthGenerator = generateMonth(calendarDate);

    const month_days: React.ReactNode[][] = [];

    const days: React.ReactNode[] = [];

    monthGenerator().map((week: Date[], week_index: number) => {
      week.map((day, day_index) => {
        days.push(
          <React.Fragment key={`${week_index}-${day_index}`}>
            <CalendarDate date={day} startDate={startDate} />
          </React.Fragment>
        );
      });
    });

    month_days.push(days);

    return month_days;
  };

  const renderWeek = (calendarDate: Date) => {
    const weekGenerator = generateWeek(calendarDate);

    const week_days: React.ReactNode[] = [];

    const days: React.ReactNode[] = [];

    weekGenerator().map((day: Date, day_index: number) => {
      days.push(
        <React.Fragment key={`${day_index}`}>
          <CalendarDate date={day} startDate={startDate} />
        </React.Fragment>
      );
    });

    week_days.push(days);

    return week_days;
  };

  const month = useMemo(() => {
    if (monthView) {
      return renderMonth(calendarDate);
    } else {
      return renderWeek(calendarDate);
    }
  }, [calendarDate, monthView]);

  return <div style={styles.calendar}>{month}</div>;
};

export default CalendarDisplay;
