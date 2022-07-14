import { startOfWeek, format, addWeeks, startOfMonth } from "date-fns";
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
  const [monthView, setMonthView] = useState(true);
  const [calendarDate, setCalendarDate] = useState(selectedDate);

  // Functions

  const addToDate = () => {
    if (monthView) {
      setCalendarDate(startOfMonth(addMonths(calendarDate, 1)));
    } else {
      setCalendarDate(startOfWeek(addWeeks(calendarDate, 1)));
    }
  };

  const subToDate = () => {
    if (monthView) {
      setCalendarDate(startOfMonth(subMonths(calendarDate, 1)));
    } else {
      setCalendarDate(startOfWeek(subWeeks(calendarDate, 1)));
    }
  };

  const resetDate = () => {
    setCalendarDate(selectedDate);
  };

  const changeDisplay = () => {
    setMonthView(!monthView);
  };

  return (
    <div>
      <h1 className=" text-3xl">
        Calendar {format(calendarDate, "MMMMMM yyyy")}
      </h1>
      <p>Today: {format(selectedDate, "MM/dd/yyyy'")}</p>

      <button onClick={resetDate} style={styles.blueButton}>
        Go Today
      </button>
      <button onClick={changeDisplay} style={styles.greenButton}>
        {monthView ? "Week View" : "Month View"}
      </button>

      <div>
        <button onClick={subToDate} style={styles.button}>
          {"<"}
        </button>
        <button onClick={addToDate} style={styles.button}>
          {">"}
        </button>
      </div>

      <CalendarDisplay
        startDate={startDate}
        monthView={monthView}
        calendarDate={calendarDate}
      />
    </div>
  );
};

export default Calendar;
