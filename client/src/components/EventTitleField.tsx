import { Dispatch, SetStateAction, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Props {
  data: { [key: string]: string | { [key: string]: string } };
  setData?: Dispatch<
    SetStateAction<{ [key: string]: string | { [key: string]: string } }>
  >;
  currentField: number;
  setCurrentField: Dispatch<SetStateAction<number>>;
  handleNextField: (
    newData: {
      [key: string]: string | { [key: string]: string };
    },
    final: boolean
  ) => void;
}

const EventTitleField = ({
  data,
  setData,
  currentField,
  setCurrentField,
  handleNextField,
}: Props) => {
  const titleFieldValSchema = Yup.object({
    title: Yup.string()
      .required()
      .label("This")
      .min(0, "Title is too long")
      .max(30, "Title is too long"),
  });

  return (
    <div className=" w-fit m-auto">
      <Formik
        validationSchema={titleFieldValSchema}
        initialValues={data}
        onSubmit={(values) => {
          handleNextField(values, false);
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
              autocomplete="off"
            />

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
