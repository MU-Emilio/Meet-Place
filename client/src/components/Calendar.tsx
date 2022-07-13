import { startOfMonth, startOfWeek, format } from "date-fns";
import React, { useState } from "react";
import takeMonth from "../utils/calendar_utils";
import CalendarDate from "./CalendarDate";

// Styles
const styles = {
  calendar: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 200px)",
  },
};

const Calendar = () => {
  // States
  const [month, setMonth] = useState("July");

  const selectedDate = new Date();
  const startDate = selectedDate;

  const monthGenerator = takeMonth(startDate);

  // Functions

  const renderMonth = (number_of_months: number) => {
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

  return (
    <div>
      <h1>Calendar {month}</h1>
      <p>Today: {format(selectedDate, "MM/dd/yyyy'")}</p>
      <div style={styles.calendar}>{renderMonth(1)}</div>
    </div>
  );
};

export default Calendar;
