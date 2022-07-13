import {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  startOfDay,
  addDays,
} from "date-fns";

const generateWeek = (start: Date = new Date()) => {
  let date = startOfWeek(startOfDay(start));

  return () => {
    const week = [...Array(7)].map((_, i) => addDays(date, i));
    date = addDays(week[6], 1);
    return week;
  };
};

const generateMonth = (start: Date = new Date()) => {
  let month: Date[][] = [];
  let date = start;

  const lastDayOfRange = (range: any) => {
    return range[range.length - 1][6];
  };

  return () => {
    const weekGenerator = generateWeek(startOfMonth(date));
    const endDate = startOfDay(endOfWeek(endOfMonth(date)));
    month.push(weekGenerator());

    while (lastDayOfRange(month) < endDate) {
      month.push(weekGenerator());
    }

    const range = month;
    month = [];
    date = addDays(lastDayOfRange(range), 1);

    return range;
  };
};

export default generateMonth;
