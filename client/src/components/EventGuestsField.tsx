import React from "react";
import FriendsContainer from "./FriendsContainer";
import { Dispatch, SetStateAction } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Props {
  data: { [key: string]: string | { [key: string]: string } };
  handleNextField: (
    newData: {
      [key: string]: string | { [key: string]: string };
    },
    final: boolean
  ) => void;
  handlePrevField: (newData: {
    [key: string]: string | { [key: string]: string };
  }) => void;
}

const EventGuestsField = ({
  data,
  handleNextField,
  handlePrevField,
}: Props) => {
  return (
    <div className=" w-8/12 m-auto flex">
      <div className=" w-1/4">
        <FriendsContainer />
      </div>
      <div className=" w-fit m-auto">
        <Formik
          initialValues={data}
          onSubmit={(values) => {
            handleNextField(values, false);
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
    </div>
  );
};

export default EventGuestsField;
