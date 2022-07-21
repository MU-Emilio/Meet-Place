import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import EventTitleField from "./EventTitleField";
import EventDescriptionField from "./EventDescriptionField";
import EventDateLocationField from "./EventDateLocationField";
import EventGuestsContainer from "./EventGuestsContainer";

const EventCreateForm = () => {
  const [data, setData] = useState<{
    [key: string]: string | { [key: string]: string };
  }>({
    title: "",
    date: "",
    time: "",
    description: "",
    owner: {
      __type: "Pointer",
      className: "_User",
      objectId: "",
    },
    location: "",
  });

  const [currentField, setCurrentField] = useState<number>(0);

  const makeRequest = (formData: {
    [key: string]: string | { [key: string]: string };
  }) => {
    console.log("Form Submitted", formData);
  };

  const handleNextField = (
    newData: {
      [key: string]: string | { [key: string]: string };
    },
    final: boolean
  ) => {
    setData((prev) => ({ ...prev, ...newData }));
    console.log(newData);

    if (final) {
      makeRequest(newData);
      return;
    }

    setCurrentField((prev) => prev + 1);
  };

  const handlePrevField = (newData: {
    [key: string]: string | { [key: string]: string };
  }) => {
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
    <EventDateLocationField
      data={data}
      handleNextField={handleNextField}
      handlePrevField={handlePrevField}
    />,
    <EventGuestsContainer
      data={data}
      handleNextField={handleNextField}
      handlePrevField={handlePrevField}
    />,
  ];

  //   return <div>{fields[currentField]}</div>;
  return (
    <EventGuestsContainer
      data={data}
      handleNextField={handleNextField}
      handlePrevField={handlePrevField}
    />
  );
};

export default EventCreateForm;
