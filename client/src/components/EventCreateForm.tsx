import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import EventTitleField from "./EventTitleField";
import EventDescriptionField from "./EventDescriptionField";

const EventCreateForm = () => {
  const [data, setData] = useState<{
    [key: string]: string | { [key: string]: string };
  }>({
    title: "Great America Meet",
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

  return (
    <div>
      <EventTitleField
        data={data}
        setData={setData}
        currentField={currentField}
        setCurrentField={setCurrentField}
      ></EventTitleField>

      <EventDescriptionField
        data={data}
        setData={setData}
        currentField={currentField}
        setCurrentField={setCurrentField}
      ></EventDescriptionField>
    </div>
  );
};

export default EventCreateForm;
