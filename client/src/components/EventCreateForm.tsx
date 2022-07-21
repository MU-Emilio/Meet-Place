import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import EventTitleField from "./EventTitleField";
import EventDescriptionField from "./EventDescriptionField";
import EventDateLocationField from "./EventDateLocationField";
import EventGuestsContainer from "./EventGuestsContainer";
import { User, EventForm } from "../lib/types";
import axios from "axios";
import { SESSION_KEY } from "../lib/constants";
import { useMutation } from "react-query";

interface Props {
  owner: string;
}

const EventCreateForm = ({ owner }: Props) => {
  const [data, setData] = useState<EventForm>({
    title: "",
    date: "",
    time: "",
    description: "",
    location: "",
    guests: [],
  });

  const [currentField, setCurrentField] = useState<number>(0);

  const createEvent = async () => {
    const { data: response } = await axios.post(
      "http://localhost:3001/event/add",
      {
        event: data,
      },
      {
        headers: {
          authorization: localStorage.getItem(SESSION_KEY) || false,
        },
      }
    );
    return response.data;
  };

  const { mutate, isLoading } = useMutation(createEvent);

  const makeRequest = (formData: EventForm) => {
    console.log("Form Submitted", formData);
  };

  const handleNextField = (newData: EventForm, final: boolean) => {
    setData((prev) => ({ ...prev, ...newData }));
    console.log(newData);

    if (final) {
      makeRequest(newData);
      return;
    } else {
      setCurrentField((prev) => prev + 1);
    }
  };

  const handlePrevField = (newData: EventForm) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentField((prev) => prev - 1);
    console.log(newData);
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
    <EventGuestsContainer
      data={data}
      handleNextField={handleNextField}
      handlePrevField={handlePrevField}
    />,
    <EventDateLocationField
      data={data}
      handleNextField={handleNextField}
      handlePrevField={handlePrevField}
    />,
  ];

  return <div>{fields[currentField]}</div>;
};

export default EventCreateForm;
