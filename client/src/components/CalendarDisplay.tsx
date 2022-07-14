import { startOfMonth, startOfWeek, format } from "date-fns";
import { addMonths } from "date-fns/esm";
import React, { useState, useMemo } from "react";
import { generateMonth, generateWeek } from "../utils/calendar_utils";
import { WEEK_DAYS } from "../utils/constats";
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
  weekDate: Date;
}

const CalendarDisplay = ({
  selectedDate,
  setSelectedDate,
  startDate,
  setStartDate,
  calendarDate,
  setCalendarDate,
  monthView,
  weekDate,
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

  const renderWeek = (weekDate: Date) => {
    const weekGenerator = generateWeek(weekDate);

    const week_days: React.ReactNode[] = [];

    weekGenerator().map((day: Date, day_index: number) => {
      week_days.push(
        <React.Fragment key={`${day_index}`}>
          <CalendarDate date={day} startDate={startDate} />
        </React.Fragment>
      );
    });

    return week_days;
  };

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
      return renderMonth(calendarDate);
    } else {
      return renderWeek(weekDate);
    }
  }, [calendarDate, monthView, weekDate]);

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
