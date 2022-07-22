import { startOfWeek, format, addWeeks, startOfMonth } from "date-fns";
import { addMonths, subMonths, subWeeks } from "date-fns/esm";
import { useState } from "react";
import CalendarDisplay from "./CalendarDisplay";
import { useQuery } from "react-query";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { EventType } from "../lib/types";
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

const Calendar = () => {
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

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:3001/events", {
      headers: {
        authorization: localStorage.getItem(SESSION_KEY) || false,
      },
    });
    const eventsJson = manageEvents(response.data);
    return eventsJson;
  };

  const { isLoading, error, data } = useQuery<{ [key: string]: EventType[] }>(
    ["events"],
    fetchEvents
  );

  const manageEvents = (data: EventType[]) => {
    const events_json: { [key: string]: EventType[] } = {};
    if (data) {
      data.map((event: EventType) => {
        const date = event.date.iso.split("T")[0];
        const dateSplit = date.split("-");
        if (events_json[date]) {
          events_json[date] = [...events_json[date], event];
        } else {
          events_json[date] = [event];
        }
      });
    }
    return events_json;
  };

  return (
    <div>
      <div className=" bg-gray-100 flex justify-around w-[770px] px-3 py-5 align-middle mb-5 rounded-md shadow-sm">
        <div className="flex gap-3">
          <div>
            <h1 className=" text-3xl font-bold">
              Calendar {format(calendarDate, "MMMMMM yyyy")}
            </h1>
            <p>Today: {format(selectedDate, "MM/dd/yyyy'")}</p>
          </div>
        </div>

        <div className="flex gap-2 h-fit">
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
            onClick={() => {}}
            className=" h-fit bg-gray-200 p-2 rounded-md shadow-md hover:scale-105 ease-in-out duration-300"
          >
            Create Event
          </button>
        </div>
      </div>

      {!isLoading && data != null ? (
        <>
          <CalendarDisplay
            startDate={startDate}
            monthView={monthView}
            calendarDate={calendarDate}
            events={data}
            changeDisplay={changeDisplay}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Calendar;
