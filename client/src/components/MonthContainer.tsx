import React from "react";
import CalendarDate from "./CalendarDate";
import { generateMonth } from "../utils/calendar_utils";
import { EventType } from "../lib/types";

interface Props {
  startDate: Date;
  calendarDate: Date;
  events: { [key: string]: EventType[] };
  changeDisplay: () => void;
}

export const MonthContainer = ({
  startDate,
  calendarDate,
  events,
  changeDisplay,
}: Props) => {
  const renderMonth = (monthDate: Date) => {
    const monthGenerator = generateMonth(monthDate);

    const month_days: React.ReactNode[][] = [];

    const days: React.ReactNode[] = [];

    monthGenerator().map((week: Date[], week_index: number) => {
      week.map((day, day_index) => {
        days.push(
          <React.Fragment key={`${week_index}-${day_index}`}>
            <CalendarDate
              date={day}
              startDate={startDate}
              events={events}
              changeDisplay={changeDisplay}
            />
          </React.Fragment>
        );
      });
    });

    month_days.push(days);

    return month_days;
  };
  return <>{renderMonth(calendarDate)}</>;
};
