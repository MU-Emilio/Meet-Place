import { startOfWeek, format, addWeeks, startOfMonth } from "date-fns";
import { addMonths, subMonths, subWeeks } from "date-fns/esm";
import { useEffect, useState } from "react";
import CalendarDisplay from "./CalendarDisplay";
import { useQuery } from "react-query";
import axios from "axios";

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

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:3001/events");
    const events_json = manageEvents(response.data);
    return events_json;
  };

  const { isLoading, error, data } = useQuery<any>(["events"], fetchEvents);

  const manageEvents = (data: any) => {
    const events_json: any = {};
    if (data) {
      data.map((event: any) => {
        const date = event.date.iso.split("T")[0];
        const dateSplit = date.split("-");
        if (events_json[dateSplit]) {
          events_json[dateSplit] = [...events_json[dateSplit], event];
        } else {
          events_json[dateSplit] = [event];
        }
      });
    }
    return events_json;
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

      {!isLoading && data != null ? (
        <CalendarDisplay
          startDate={startDate}
          monthView={monthView}
          calendarDate={calendarDate}
          events={data}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Calendar;
