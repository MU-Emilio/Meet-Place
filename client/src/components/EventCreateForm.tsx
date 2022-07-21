import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import EventTitleField from "./EventTitleField";
import EventDescriptionField from "./EventDescriptionField";

const EventCreateForm = () => {
  const [data, setData] = useState<{
    [key: string]: string | { [key: string]: string };
  }>({
    title: "",
    date: {
      __type: "Date",
      iso: "",
    },
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
  };

  const fields = [
    <EventTitleField
      data={data}
      setData={setData}
      currentField={currentField}
      setCurrentField={setCurrentField}
      handleNextField={handleNextField}
    ></EventTitleField>,
    <EventDescriptionField
      data={data}
      setData={setData}
      currentField={currentField}
      setCurrentField={setCurrentField}
      handleNextField={handleNextField}
      handlePrevField={handlePrevField}
    ></EventDescriptionField>,
  ];

  return <div>{fields[currentField]}</div>;
};

export default EventCreateForm;
