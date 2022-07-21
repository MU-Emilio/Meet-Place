import { Dispatch, SetStateAction } from "react";
import { Formik, Field, Form } from "formik";

interface Props {
  data: { [key: string]: string | { [key: string]: string } };
  setData?: Dispatch<
    SetStateAction<{ [key: string]: string | { [key: string]: string } }>
  >;
  currentField: number;
  setCurrentField: Dispatch<SetStateAction<number>>;
}

const EventTitleField = ({
  data,
  setData,
  currentField,
  setCurrentField,
}: Props) => {
  return (
    <div className=" w-fit m-auto">
      <Formik initialValues={{ title: "" }} onSubmit={() => {}}>
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
            />

            <button type="submit" className="mt-4">
              Next
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventTitleField;
