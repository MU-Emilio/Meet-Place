import React, { useState } from "react";
import { User } from "../lib/types";
import { API_URL, SESSION_KEY } from "../lib/constants";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "./Loading/Loading";
import { EventTypeStatus } from "../lib/types";
import GeneralLoading from "./GeneralLoading";
import Calendar from "./Calendar";

const CalendarEventsContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const manageEvents = (data: EventTypeStatus[]) => {
    const events_json: { [key: string]: EventTypeStatus[] } = {};
    if (data) {
      data.map((item: EventTypeStatus) => {
        const date = item.event.date.iso.split("T")[0];
        const dateSplit = date.split("-");
        if (events_json[date]) {
          events_json[date] = [...events_json[date], item];
        } else {
          events_json[date] = [item];
        }
      });
    }
    return events_json;
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const fetchEvents = async () => {
    const response = await axios.get(
      `${API_URL}/events/category/${selectedCategory}`,
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    const eventsJson = manageEvents(response.data);
    return eventsJson;
  };

  const { isLoading, error, data } = useQuery<{
    [key: string]: EventTypeStatus[];
  }>([`events-${selectedCategory}`], fetchEvents);

  if (isLoading || !data) {
    return <GeneralLoading />;
  }

  return (
    <Calendar
      events={data}
      handleSelectCategory={handleSelectCategory}
      selectedCategory={selectedCategory}
    />
  );
};

export default CalendarEventsContainer;
