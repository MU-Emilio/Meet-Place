import { startOfWeek, format, addWeeks, startOfMonth } from "date-fns";
import { addMonths, subMonths, subWeeks } from "date-fns/esm";
import { useState } from "react";
import CalendarDisplay from "./CalendarDisplay";
import { useQuery } from "react-query";
import axios from "axios";
import { API_URL, SESSION_KEY } from "../lib/constants";
import { EventType, EventTypeStatus } from "../lib/types";
import { Navigate, useNavigate } from "react-router-dom";

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

interface Props {
  events: {
    [key: string]: EventTypeStatus[];
  };
}

const Calendar = ({ events }: Props) => {
  // States
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(selectedDate);
  const [monthView, setMonthView] = useState(true);
  const [calendarDate, setCalendarDate] = useState(selectedDate);
  const navigate = useNavigate();

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
      <div>
        <div className=" bg-gray-100 flex justify-around w-[800px] h-[100px] px-3 py-5 align-middle mb-5 rounded-md shadow-md">
          <div className="flex gap-3 w-[500px]">
            <div>
              <h1 className=" text-3xl font-medium">
                Calendar{" "}
                <span className=" text-primary text-4xl font-bold">
                  {format(calendarDate, "MMMMMM yyyy")}
                </span>
              </h1>
              <p className=" text-sm">
                Today: {format(selectedDate, "MM/dd/yyyy'")}
              </p>
            </div>
          </div>

          <div className="flex gap-2 h-fit w-[420px]">
            <div className="flex gap-1 h-fit">
              <button
                onClick={subToDate}
                className=" bg-gray-200 p-2 rounded-l-md shadow-md hover:scale-105 ease-in-out duration-300"
              >
                {"<"}
              </button>
              <button
                onClick={resetDate}
                className=" bg-gray-200 p-2 shadow-md hover:scale-105 ease-in-out duration-300"
              >
                Today
              </button>
              <button
                onClick={addToDate}
                className=" bg-gray-200 p-2 rounded-r-md shadow-md hover:scale-105 ease-in-out duration-300"
              >
                {">"}
              </button>
            </div>
            <button
              onClick={changeDisplay}
              className=" h-fit bg-gray-200 p-2 rounded-md shadow-md hover:scale-105 ease-in-out duration-300"
            >
              {monthView ? "Week View" : "Month View"}
            </button>
            <button
              onClick={() => {
                navigate("/addEvent");
              }}
              className=" h-fit bg-gray-200 p-2 rounded-md shadow-md hover:scale-105 ease-in-out duration-300"
            >
              Create Event
            </button>
          </div>
        </div>

        <CalendarDisplay
          startDate={startDate}
          monthView={monthView}
          calendarDate={calendarDate}
          events={events}
          changeDisplay={changeDisplay}
        />
      </div>
      <footer className=" bg-primary h-8"></footer>
    </div>
  );
};

export default Calendar;
