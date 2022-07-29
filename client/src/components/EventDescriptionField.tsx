import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User, EventForm } from "../lib/types";
import { BiCaretRight, BiCaretLeft } from "react-icons/bi";

interface Props {
  data: EventForm;
  handleNextField: (newData: EventForm) => void;
  handlePrevField: (newData: EventForm) => void;
}

const descriptionFieldValSchema = Yup.object({
  description: Yup.string().required().label("This"),
});

const EventDescriptionField = ({
  data,
  handleNextField,
  handlePrevField,
}: Props) => {
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
              What is it{" "}
              <span className=" text-primary font-semibold">about</span> ?...
            </label>
            <Field
              className="block text-2xl border-2 mx-auto mt-[50px] w-[500px] px-5 py-2"
              id="description"
              name="description"
              placeholder="Give it a nice description!"
              autoComplete="off"
            />

            <div className=" text-red-400 w-[500px] mx-auto">
              <ErrorMessage name="description" />
            </div>

            <div className="mx-auto flex gap-6 w-fit mt-[100px]">
              <button
                className="block mt-4 bg-secundary px-5 py-2 text-white font-medium rounded-md hover:opacity-50 hover:text-gray-800 hover:scale-105 ease-in-out duration-300"
                type="button"
                onClick={() => handlePrevField(values)}
              >
                <BiCaretLeft />
              </button>
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

export default EventDescriptionField;
