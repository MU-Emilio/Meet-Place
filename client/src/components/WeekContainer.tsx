import React from "react";
import { generateWeek } from "../utils/calendar_utils";
import { EventType, EventTypeStatus } from "../lib/types";
import WeekDate from "./WeekDate";

interface Props {
  startDate: Date;
  calendarDate: Date;
  events: { [key: string]: EventTypeStatus[] };
  changeDisplay: () => void;
}

export const WeekContainer = ({
  startDate,
  calendarDate,
  events,
  changeDisplay,
}: Props) => {
  const renderWeek = (weekDate: Date) => {
    const weekGenerator = generateWeek(weekDate);

    const week_days: React.ReactNode[] = [];

    weekGenerator().map((day: Date, day_index: number) => {
      week_days.push(
        <React.Fragment key={`${day_index}`}>
          <WeekDate
            date={day}
            startDate={startDate}
            events={events}
            changeDisplay={changeDisplay}
          />
        </React.Fragment>
      );
    });

    return week_days;
  };

  return <>{renderWeek(calendarDate)}</>;
};
