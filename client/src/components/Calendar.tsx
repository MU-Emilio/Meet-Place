import { addDays, format, startOfDay } from "date-fns";

const Calendar = () => {
  const date = new Date();
  const tomorrow = addDays(date, 1);
  const start = startOfDay(date);

  console.log(date);
  console.log(tomorrow);
  console.log(start);

  return <div>Calendar</div>;
};

export default Calendar;
