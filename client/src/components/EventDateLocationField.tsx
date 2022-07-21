import { Dispatch, SetStateAction, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User, EventForm } from "../lib/types";

interface Props {
  data: EventForm;
  handleNextField: (newData: EventForm, final: boolean) => void;
  handlePrevField: (newData: EventForm) => void;
}

const EventDateLocationField = ({
  data,
  handleNextField,
  handlePrevField,
}: Props) => {
  const dateTimeFieldValSchema = Yup.object({
    date: Yup.string().required().label("Date"),
  });

  return (
    <div className=" w-fit m-auto">
      <Formik
        validationSchema={dateTimeFieldValSchema}
        initialValues={data}
        onSubmit={(values) => {
          handleNextField(values, false);
        }}
      >
        {({ values }) => (
          <Form className="block">
            <div className="flex gap-10">
              <div>
                <label className="block text-4xl mx-auto" htmlFor="date">
                  When?
                </label>
                <Field
                  className="block w-96 h-10 border-2 m-auto mt-4"
                  id="date"
                  name="date"
                  type="date"
                  placeholder="Date"
                />
                <Field
                  className="block w-96 h-10 border-2 m-auto mt-4"
                  id="time"
                  name="time"
                  type="time"
                  placeholder="Date"
                />
              </div>

              <div>
                <label className="block text-4xl mx-auto" htmlFor="description">
                  Where?
                </label>
                <p>{"If it's a remote event, don't type a location"}</p>
                <Field
                  className="block w-96 h-10 border-2 m-auto mt-4"
                  id="location"
                  name="location"
                  placeholder="Where are you going?"
                  autoComplete="off"
                />
              </div>
            </div>

            <ErrorMessage name="date" />

            <div className="flex w-fit gap-6 m-auto">
              <button
                type="button"
                className="mt-4"
                onClick={() => handlePrevField(values)}
              >
                Back
              </button>
              <button type="submit" className="mt-4">
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventDateLocationField;
