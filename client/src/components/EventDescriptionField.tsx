import { Dispatch, SetStateAction } from "react";
import { Formik, Field, Form } from "formik";

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
  handlePrevField: (newData: {
    [key: string]: string | { [key: string]: string };
  }) => void;
}

const EventDescriptionField = ({
  data,
  setData,
  currentField,
  setCurrentField,
  handleNextField,
  handlePrevField,
}: Props) => {
  return (
    <div className=" w-fit m-auto">
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          handleNextField(values, true);
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
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventDescriptionField;
