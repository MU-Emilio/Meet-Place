import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User, EventForm } from "../lib/types";
import { BiCaretRight, BiCaretLeft } from "react-icons/bi";
import CategoryContainer from "./CategoryContainer";
import { useState } from "react";

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryError, setCategoryError] = useState<string | null>(null);

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
              className="block text-4xl mx-auto text-center font-medium"
              htmlFor="description"
            >
              What is it{" "}
              <span className=" text-primary font-semibold">about</span> ?...
            </label>

            <div className=" w-[1000px] items-center">
              <div className="w-[750px] mx-auto">
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

              <div className="w-[400px] flex justify-around gap-3 items-center mx-auto mt-10">
                <div
                  className={`transition ease-in-out duration-100 cursor-pointer ${
                    values.category === "NGS8wCuqGp"
                      ? "scale-125"
                      : "hover:scale-110"
                  }`}
                  onClick={() => {
                    setSelectedCategory("NGS8wCuqGp");
                    values.category = "NGS8wCuqGp";
                    setCategoryError(null);
                  }}
                >
                  <CategoryContainer
                    categoryId={"NGS8wCuqGp"}
                    complete={true}
                  />
                </div>
                <div
                  className={`transition ease-in-out duration-100 cursor-pointer ${
                    values.category === "1HncAqKnRf"
                      ? "scale-125"
                      : "hover:scale-110"
                  }`}
                  onClick={() => {
                    setSelectedCategory("1HncAqKnRf");
                    values.category = "1HncAqKnRf";
                    setCategoryError(null);
                  }}
                >
                  <CategoryContainer
                    categoryId={"1HncAqKnRf"}
                    complete={true}
                  />
                </div>
                <div
                  className={`transition ease-in-out duration-100 cursor-pointer ${
                    values.category === "pBcDBoupKP"
                      ? "scale-125"
                      : "hover:scale-110"
                  }`}
                  onClick={() => {
                    setSelectedCategory("pBcDBoupKP");
                    values.category = "pBcDBoupKP";
                    setCategoryError(null);
                  }}
                >
                  <CategoryContainer
                    categoryId={"pBcDBoupKP"}
                    complete={true}
                  />
                </div>
              </div>

              {categoryError && (
                <p className="text-red-400 w-[500px] mx-auto text-center mt-4">
                  {categoryError}
                </p>
              )}
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
                onClick={() => {
                  if (selectedCategory === "") {
                    setCategoryError(
                      "You have to select a category for your event"
                    );
                  } else {
                    values.category = selectedCategory;
                    handleNextField(values);
                  }
                }}
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
