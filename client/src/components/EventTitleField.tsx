import { Dispatch, SetStateAction, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User, EventForm } from "../lib/types";

interface Props {
  data: EventForm;
  handleNextField: (newData: EventForm) => void;
}

const titleFieldValSchema = Yup.object({
  title: Yup.string()
    .required()
    .label("This")
    .min(0, "Title is too long")
    .max(30, "Title is too long"),
});

const EventTitleField = ({ data, handleNextField }: Props) => {
  return (
    <div className=" w-fit m-auto">
      <Formik
        validationSchema={titleFieldValSchema}
        initialValues={data}
        onSubmit={(values) => {
          handleNextField(values);
        }}
      >
        {() => (
          <Form className="block">
            <label className="block text-4xl mx-auto" htmlFor="title">
              Give it a good title for your friends
            </label>

            <Field
              className="block text-2xl border-2 m-auto mt-4"
              id="title"
              name="title"
              placeholder="Title"
              autoComplete="off"
            />

            <div className="flex items-center mt-5 gap-5">
              <label htmlFor="private">Is this a private event?</label>
              <Field
                className=""
                id="privacy"
                name="privacy"
                placeholder="Title"
                type="checkbox"
              />
            </div>

            <ErrorMessage name="title" />

            <button type="submit" className="block mt-4">
              Next
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventTitleField;
