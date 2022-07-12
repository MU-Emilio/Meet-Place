import { format } from "date-fns";
import React from "react";

interface Props {
  date: Date;
}

const CalendarDate = ({ date }: Props) => {
  console.log(date);
  return <div>{format(date, "MMMMMM/dd/yyyy")}</div>;
};

export default CalendarDate;
