import { Dispatch, SetStateAction } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User, EventForm } from "../lib/types";

interface Props {
  data: EventForm;
  handleNextField: (newData: EventForm) => void;
  handlePrevField: (newData: EventForm) => void;
}

const EventDescriptionField = ({
  data,
  handleNextField,
  handlePrevField,
}: Props) => {
  const descriptionFieldValSchema = Yup.object({
    description: Yup.string().required().label("This"),
  });

  return (
    <div className=" w-fit m-auto">
      <Formik
        validationSchema={descriptionFieldValSchema}
        initialValues={data}
        onSubmit={(values) => {
          handleNextField(values);
        }}
      >
        {({ values }) => (
          <Form className="block">
            <label className="block text-4xl mx-auto" htmlFor="description">
              What is it about?...
            </label>
            <Field
              className="block w-96 h-10 border-2 m-auto mt-4"
              id="description"
              name="description"
              placeholder="Give it a nice description!"
              autoComplete="off"
            />

            <ErrorMessage name="description" />

            <div className="flex gap-6">
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

export default EventDescriptionField;
