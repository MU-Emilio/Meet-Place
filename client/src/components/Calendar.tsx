import { startOfMonth, startOfWeek, format } from "date-fns";
import { addMonths, subMonths } from "date-fns/esm";
import React, { useState } from "react";
import generateMonth from "../utils/calendar_utils";
import CalendarDate from "./CalendarDate";
import CalendarDisplay from "./CalendarDisplay";

const styles = {
  button: {
    backgroundColor: "#EA574A",
    padding: "0.5rem 1.25rem",
    margin: "1rem",
  },
};

const Calendar = () => {
  // States
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(selectedDate);
  const [calendarDate, setCalendarDate] = useState(selectedDate);

  // Functions

  const nextMonth = () => {
    setCalendarDate(addMonths(calendarDate, 1));
  };

  const lastMonth = () => {
    setCalendarDate(subMonths(calendarDate, 1));
  };

  const resetDate = () => {
    setCalendarDate(selectedDate);
  };

  return (
    <div>
      <h1>Calendar {format(calendarDate, "MMMMMM yyyy")}</h1>
      <p>Today: {format(selectedDate, "MM/dd/yyyy'")}</p>
      <button onClick={lastMonth} style={styles.button}>
        Back
      </button>
      <button onClick={nextMonth} style={styles.button}>
        Next
      </button>
      <button onClick={resetDate} style={styles.button}>
        Today
      </button>
      <CalendarDisplay
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        startDate={startDate}
        setStartDate={setStartDate}
        calendarDate={calendarDate}
        setCalendarDate={setCalendarDate}
      />
    </div>
  );
};

export default Calendar;
