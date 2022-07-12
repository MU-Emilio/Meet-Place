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

  const takeMonth = (start: Date) => {
    let month: Date[][] = [];
    let date = start;

    return () => {
      const weekGenerator = takeWeek(startOfMonth(date));
      const endDate = startOfDay(endOfWeek(endOfMonth(date)));
      month.push(weekGenerator());

      while (month[month.length - 1][6] < endDate) {
        month.push(weekGenerator());
      }

      return month;
    };
  };

  const monthGenerator = takeMonth(startDate);

  console.log(monthGenerator());

  return (
    <div>
      <h1>Calendar</h1>
    </div>
  );
};

export default Calendar;
