import { format } from "date-fns";
import React from "react";

interface Props {
  date: Date;
}

const CalendarDate = ({ date }: Props) => {
  return (
    <div>
      <p className="border h-20 px-1">{format(date, "dd")}</p>
    </div>
  );
};

export default CalendarDate;
