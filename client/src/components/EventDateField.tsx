import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { EventForm } from "../lib/types";
import EventGuestsContainer from "./EventGuestsContainer";

interface Props {
  data: EventForm;
  handleNextField: (newData: EventForm) => void;
  handlePrevField: (newData: EventForm) => void;
}

const dateTimeFieldValSchema = Yup.object({
  date: Yup.string().required().label("Date"),
});

const EventDateField = ({ data, handleNextField, handlePrevField }: Props) => {
  const [dateState, setDateState] = useState<string>(data.date);
  const [timeState, setTimeState] = useState<string>(data.time);

  return (
    <div className=" w-[800px] m-auto">
      <Formik
        validationSchema={dateTimeFieldValSchema}
        initialValues={data}
        onSubmit={(values) => {
          handleNextField(values);
        }}
      >
        {({ values }) => (
          <Form className="block">
            <div className="mb-12">
              <div className="flex gap-10">
                <div>
                  <label className="block text-4xl mx-auto" htmlFor="date">
                    When?
                  </label>
                  {/* <Field
                    className="block w-96 h-10 border-2 m-auto mt-4"
                    id="date"
                    name="date"
                    type="date"
                    placeholder="Date"
                    onChange={(e: any) => {
                      console.log(e);
                      // data.date;
                    }}
                  /> */}
                  <input
                    className="block w-96 h-10 border-2 m-auto mt-4"
                    type="date"
                    name="date"
                    value={dateState}
                    placeholder="Date"
                    onChange={(e: any) => {
                      data.date = e.target.value;
                      setDateState(e.target.value);
                      console.log(data.date);
                    }}
                  />
                  <Field
                    className="block w-96 h-10 border-2 m-auto mt-4"
                    id="time"
                    name="time"
                    type="time"
                    placeholder="Date"
                  />
                  <ErrorMessage name="date" />
                </div>
              </div>
            </div>
            <div className="w-full">
              <EventGuestsContainer
                data={data}
                dateState={dateState}
                handleNextField={handleNextField}
                handlePrevField={handlePrevField}
              />
            </div>
            <div className="flex w-fit gap-6 m-auto">
              <button
                type="button"
                className="mt-4"
                onClick={() => handlePrevField(values)}
              >
                Back
              </button>
              <button
                type="button"
                className="mt-4"
                onClick={() => handleNextField(values)}
              >
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventDateField;
