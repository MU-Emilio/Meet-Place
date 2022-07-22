import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EventForm } from "../lib/types";

interface Props {
  data: EventForm;
  handleNextField: (newData: EventForm) => void;
  handlePrevField: (newData: EventForm) => void;
}

const dateTimeFieldValSchema = Yup.object({
  date: Yup.string().required().label("Date"),
});

const EventDateLocationField = ({
  data,
  handleNextField,
  handlePrevField,
}: Props) => {
  return (
    <div className=" w-fit m-auto">
      <Formik
        validationSchema={dateTimeFieldValSchema}
        initialValues={data}
        onSubmit={(values) => {
          handleNextField(values);
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
                <ErrorMessage name="date" />
              </div>

              <div>
                <label className="block text-4xl mx-auto" htmlFor="description">
                  Where are you going?
                </label>
                <Field
                  className="block w-96 h-10 border-2 m-auto mt-4"
                  id="location"
                  name="location"
                  placeholder="Where are you going?"
                  autoComplete="off"
                />
                <ErrorMessage name="location" />
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
              <button type="submit" className="mt-4">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventDateLocationField;
