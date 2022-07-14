import { startOfWeek, format, addWeeks } from "date-fns";
import { addMonths, subMonths, subWeeks } from "date-fns/esm";
import { useState } from "react";
import CalendarDisplay from "./CalendarDisplay";

const styles = {
  button: {
    backgroundColor: "#EA574A",
    padding: "0.5rem 1.25rem",
    margin: "1rem",
  },
  greenButton: {
    backgroundColor: "rgb(134 239 172)",
    padding: "0.5rem 1.25rem",
    margin: "1rem",
  },
  blueButton: {
    backgroundColor: "rgb(147 197 253",
    padding: "0.5rem 1.25rem",
    margin: "1rem",
  },
};

const Calendar = () => {
  // States
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(selectedDate);
  const [calendarDate, setCalendarDate] = useState(selectedDate);
  const [monthView, setMonthView] = useState(true);
  const [weekDate, setWeekDate] = useState(selectedDate);

  // Functions

  const nextMonth = () => {
    setWeekDate(addMonths(calendarDate, 1));
    setCalendarDate(addMonths(calendarDate, 1));
  };

  const lastMonth = () => {
    setWeekDate(subMonths(calendarDate, 1));
    setCalendarDate(subMonths(calendarDate, 1));
  };

  const nextWeek = () => {
    setCalendarDate(startOfWeek(addWeeks(weekDate, 1)));
    setWeekDate(startOfWeek(addWeeks(weekDate, 1)));
  };

  const lastWeek = () => {
    setCalendarDate(startOfWeek(subWeeks(weekDate, 1)));
    setWeekDate(startOfWeek(subWeeks(weekDate, 1)));
  };

  const resetDate = () => {
    setCalendarDate(selectedDate);
    setWeekDate(selectedDate);
  };

  const changeDisplay = () => {
    setMonthView(!monthView);
  };

  return (
    <div>
      <h1 className=" text-3xl">
        Calendar{" "}
        {monthView
          ? format(calendarDate, "MMMMMM yyyy")
          : format(weekDate, "MMMMMM yyyy")}
      </h1>
      <p>Today: {format(selectedDate, "MM/dd/yyyy'")}</p>
      {monthView ? (
        <div>
          <button onClick={lastMonth} style={styles.button}>
            Last Month
          </button>
          <button onClick={nextMonth} style={styles.button}>
            Next Month
          </button>
        </div>
      ) : (
        <div>
          <button onClick={lastWeek} style={styles.button}>
            Last Week
          </button>
          <button onClick={nextWeek} style={styles.button}>
            Next Week
          </button>
        </div>
      )}

      <button onClick={resetDate} style={styles.blueButton}>
        Go Today
      </button>
      <button onClick={changeDisplay} style={styles.greenButton}>
        {monthView ? "Week View" : "Month View"}
      </button>
      <CalendarDisplay
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        startDate={startDate}
        setStartDate={setStartDate}
        calendarDate={calendarDate}
        setCalendarDate={setCalendarDate}
        monthView={monthView}
        weekDate={weekDate}
      />
    </div>
  );
};

export default Calendar;
