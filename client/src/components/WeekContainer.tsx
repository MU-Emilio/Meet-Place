import React from "react";
import CalendarDate from "./CalendarDate";
import { generateWeek } from "../utils/calendar_utils";

interface Props {
  startDate: Date;
  calendarDate: Date;
  events: any;
}

export const WeekContainer = ({ startDate, calendarDate, events }: Props) => {
  const renderWeek = (weekDate: Date) => {
    const weekGenerator = generateWeek(weekDate);

    const week_days: React.ReactNode[] = [];

    weekGenerator().map((day: Date, day_index: number) => {
      week_days.push(
        <React.Fragment key={`${day_index}`}>
          <CalendarDate date={day} startDate={startDate} events={events} />
        </React.Fragment>
      );
    });

    return week_days;
  };

  return <>{renderWeek(calendarDate)}</>;
};
