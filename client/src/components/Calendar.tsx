import {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  startOfDay,
  addDays,
} from "date-fns";

const Calendar = () => {
  const selectedDate = new Date();

  const startDate = startOfWeek(startOfMonth(selectedDate));
  const endDate = endOfMonth(endOfWeek(selectedDate));

  const takeWeek = (start: Date) => {
    let date = startOfWeek(startOfDay(start));

    return () => {
      const week = [...Array(7)].map((_, i) => addDays(date, i));
      date = addDays(week[6], 1);
      return week;
    };
  };

  const tw = takeWeek(startDate);
  console.log(tw());
  console.log(tw());

  return (
    <div>
      <h1>Calendar</h1>
    </div>
  );
};

export default Calendar;
