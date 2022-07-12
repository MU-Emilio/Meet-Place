import { startOfMonth, startOfWeek, format } from "date-fns";
import React from "react";

import takeMonth from "../utils/calendar_utils";

const Calendar = () => {
  const selectedDate = new Date();

  const startDate = startOfWeek(startOfMonth(selectedDate));

  const monthGenerator = takeMonth(startDate);

  const renderMonth = (number_of_months: number) => {
    const month_days: any = [];

    for (let i = 0; i < number_of_months; i++) {
      const days: any = [];

      monthGenerator().map((week, week_index) => {
        week.map((day, day_index) => {
          days.push(
            <React.Fragment key={`${week_index}${day_index}`}>
              <p>{format(day, "MMMMMM/dd/yyyy")}</p>
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
      <h1>Calendar</h1>
      <p>Today: {format(selectedDate, "MM/dd/yyyy'")}</p>
      {renderMonth(12)}
      {renderMonth(1)}
    </div>
  );
};

export default Calendar;
