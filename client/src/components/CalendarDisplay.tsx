import { startOfMonth, startOfWeek, format } from "date-fns";
import { addMonths } from "date-fns/esm";
import React, { useState } from "react";
import generateMonth from "../utils/calendar_utils";
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
}

const CalendarDisplay = ({
  selectedDate,
  setSelectedDate,
  startDate,
  setStartDate,
  calendarDate,
  setCalendarDate,
}: Props) => {
  const renderMonth = (number_of_months: number, calendarDate: Date) => {
    const monthGenerator = generateMonth(calendarDate);

    const month_days: React.ReactNode[][] = [];

    for (let i = 0; i < number_of_months; i++) {
      const days: React.ReactNode[] = [];

      monthGenerator().map((week, week_index) => {
        week.map((day, day_index) => {
          days.push(
            <React.Fragment key={`${week_index}-${day_index}`}>
              <CalendarDate date={day} />
            </React.Fragment>
          );
        });
      });

      month_days.push(days);
    }
    return month_days;
  };
  return <div style={styles.calendar}>{renderMonth(1, calendarDate)}</div>;
};

export default CalendarDisplay;
