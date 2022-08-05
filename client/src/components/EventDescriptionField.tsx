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
  category: Yup.string().required().label("Category"),
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
            <label
              className="block text-4xl mx-auto text-center"
              htmlFor="description"
            >
              What is it{" "}
              <span className=" text-primary font-semibold">about</span> ?...
            </label>

            <div className="flex w-[1000px] justify-around items-center">
              <div className="w-[750px]">
                <Field
                  className="block text-2xl border-2 mx-auto mt-[50px] w-[600px] px-5 py-2"
                  id="description"
                  name="description"
                  placeholder="Give it a nice description!"
                  autoComplete="off"
                />

                <div className=" text-red-400 w-[500px] mx-auto">
                  <ErrorMessage name="description" />
                </div>
              </div>

              <div className="w-[50px]">
                <Field as="select" name="category" className=" border-2">
                  <option value="">Selecciona una opción</option>
                  <option value="NGS8wCuqGp">Work</option>
                  <option value="1HncAqKnRf">Social</option>
                  <option value="pBcDBoupKP">Sports</option>
                </Field>

                <div className=" text-red-400 w-[500px] mx-auto">
                  <ErrorMessage name="category" />
                </div>
              </div>
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
