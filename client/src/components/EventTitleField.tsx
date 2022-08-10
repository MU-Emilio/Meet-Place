import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EventForm } from "../lib/types";
import { BiCaretRight } from "react-icons/bi";

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
    <div className=" w-fit m-auto mt-[150px]">
      <Formik
        validationSchema={titleFieldValSchema}
        initialValues={data}
        onSubmit={(values) => {
          handleNextField(values);
        }}
      >
        {() => (
          <Form className="block">
            <label
              className="block text-4xl mx-auto font-medium"
              htmlFor="title"
            >
              Give a good{" "}
              <span className=" text-primary font-semibold">title</span> to your
              event
            </label>

            <Field
              className="block text-2xl border-2 mx-auto mt-[50px] w-[500px] px-5 py-2"
              id="title"
              name="title"
              placeholder="Title"
              autoComplete="off"
            />

            <div className=" text-red-400 w-[500px] mx-auto">
              <ErrorMessage name="title" />
            </div>

            <div className="flex items-center mx-auto mt-5">
              <div className="flex items-center mx-auto gap-5 border-l-8 px-5 py-2 border-secundary rounded-md">
                <label htmlFor="private">
                  Is this a{" "}
                  <span className=" text-secundary font-medium">private</span>{" "}
                  event?
                </label>
                <Field
                  className=""
                  id="privacy"
                  name="privacy"
                  placeholder="Title"
                  type="checkbox"
                />
              </div>
            </div>

            <div className="mx-auto w-fit mt-[100px]">
              <button
                type="submit"
                className="block mt-4 bg-secundary px-5 py-2 text-white font-medium rounded-md hover:opacity-50 hover:text-gray-800 hover:scale-105 ease-in-out duration-300"
              >
                <BiCaretRight />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventTitleField;
