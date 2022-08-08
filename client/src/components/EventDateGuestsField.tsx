import { Formik, Field, Form } from "formik";
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

const EventDateGuestsField = ({
  data,
  handleNextField,
  handlePrevField,
}: Props) => {
  const [dateState, setDateState] = useState<string>(data.date);
  const [timeState, setTimeState] = useState<string>(data.time);
  const [message, setMessage] = useState<string>("");

  return (
    <div className=" w-[1200px] m-auto ">
      <Formik
        validationSchema={dateTimeFieldValSchema}
        initialValues={data}
        onSubmit={(values) => {
          handleNextField(values);
        }}
      >
        {({ values }) => (
          <Form className="block">
            <div className="w-[650px] m-auto">
              <div className="mb-12 w-[600px]">
                <div className="flex gap-10">
                  <div className="w-full">
                    <label
                      className="block text-4xl mx-auto font-medium"
                      htmlFor="date"
                    >
                      <span className="text-primary font-bold">When</span> is
                      your event?
                    </label>
                    <input
                      className="block w-full h-10 border-2 m-auto mt-4"
                      type="date"
                      name="date"
                      value={dateState}
                      placeholder="Date"
                      onChange={(e: any) => {
                        data.date = e.target.value;
                        setDateState(e.target.value);
                      }}
                    />
                    <input
                      className="block w-full h-10 border-2 m-auto mt-4"
                      name="time"
                      type="time"
                      placeholder="Date"
                      value={timeState}
                      onChange={(e: any) => {
                        data.time = e.target.value;
                        setTimeState(e.target.value);
                      }}
                    />
                    <p>{message}</p>
                  </div>
                </div>
              </div>

              <div className="w-[600px]">
                <EventGuestsContainer data={data} />
              </div>
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
                onClick={() => {
                  if (dateState != "") {
                    handleNextField(values);
                  } else {
                    setMessage("You have to select a date to continue");
                  }
                }}
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

export default EventDateGuestsField;
