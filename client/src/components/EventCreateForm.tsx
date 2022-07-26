import { useState } from "react";
import EventTitleField from "./EventTitleField";
import EventDescriptionField from "./EventDescriptionField";
import EventDateField from "./EventDateField";
import EventGuestsContainer from "./EventGuestsContainer";
import { EventForm } from "../lib/types";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import GoogleMapsField from "./GoogleMapsField";

const EventCreateForm = () => {
  const [data, setData] = useState<EventForm>({
    title: "",
    date: "",
    time: "",
    description: "",
    location: "",
    privacy: false,
    guests: [],
  });

  const [currentField, setCurrentField] = useState<number>(0);

  const navigate = useNavigate();

  const createEvent = async (formData: EventForm) => {
    const { data: response } = await axios.post(
      "http://localhost:3001/event/add",
      {
        event: formData,
      },
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createEvent, {
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  const makeRequest = (formData: EventForm) => {
    // mutate(formData);
    console.log(formData);
    navigate("/home");
  };

  const handleNextField = (newData: EventForm) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (currentField + 1 === fields.length) {
      makeRequest(newData);
      return;
    } else {
      setCurrentField((prev) => prev + 1);
    }
  };

  const handlePrevField = (newData: EventForm) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentField((prev) => prev - 1);
  };

  const fields = [
    <EventTitleField
      data={data}
      handleNextField={handleNextField}
    ></EventTitleField>,
    <EventDescriptionField
      data={data}
      handleNextField={handleNextField}
      handlePrevField={handlePrevField}
    ></EventDescriptionField>,
    <EventDateField
      data={data}
      handleNextField={handleNextField}
      handlePrevField={handlePrevField}
    />,
    <GoogleMapsField
      data={data}
      handleNextField={handleNextField}
      handlePrevField={handlePrevField}
    />,
  ];

  return <div className="h-[800px] p-[150px]">{fields[currentField]}</div>;
};

export default EventCreateForm;
