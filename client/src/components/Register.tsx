import { useState } from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import Logo from "./Logo";
import { API_URL } from "../lib/constants";

// Styles

const styles = {
  formContainer: {
    height: "max-content",
    width: "500px",
    padding: "15px",
  },

  form: {
    display: "block",
    margin: "20px",
  },
  field: {
    display: "block",
  },
};

interface Values {
  username: string;
  password: string;
  email: string;
}

const Register = () => {
  const [submitMessage, setSubmitMessage] = useState(null);

  // Handlers
  const handleRegister = (values: any, callback: () => void) => {
    axios
      .post(`${API_URL}/user/register`, {
        fullName: values.fullName,
        email: values.email,
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        setSubmitMessage(response.data.message);
        callback();
      })
      .catch((error) => {
        setSubmitMessage(error.response.data.message);
      });
  };

  return (
    <div className="h-[900px] p-[170px]">
      <div
        className="rounded-lg mx-auto mb-0 shadow-lg border-t-8 border-primary"
        style={styles.formContainer}
      >
        <div className=" bg-white p-5">
          <Logo />
          <h1 className="text-center font-medium text-4xl">Sign Up</h1>
        </div>
        <Formik
          initialValues={{
            fullName: "",
            username: "",
            password: "",
            email: "",
          }}
          onSubmit={(values: Values, { resetForm }) => {
            handleRegister(values, () => resetForm());
          }}
        >
          <Form style={styles.form}>
            <div className="mb-5" style={styles.field}>
              <label htmlFor="email">Email</label>
              <Field
                className="block mb-5 w-full p-1 rounded-sm border-2"
                id="email"
                name="email"
                placeholder="email@email.com"
                type="email"
              />
            </div>

            <div className="mb-5" style={styles.field}>
              <label className="block" htmlFor="username">
                Full Name
              </label>
              <Field
                className="block mb-5 w-full p-1 rounded-sm border-2"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
              />
            </div>

            <div className="mb-5" style={styles.field}>
              <label className="block" htmlFor="username">
                Username
              </label>
              <Field
                className="block mb-5 w-full p-1 rounded-sm border-2"
                id="username"
                name="username"
                placeholder="Username"
              />
            </div>

            <div className="mb-5" style={styles.field}>
              <label htmlFor="password">Password</label>
              <Field
                className="block mb-5 w-full p-1 rounded-sm border-2"
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>

            <div className="mx-auto w-fit">
              <button
                className="bg-primary p-2 px-3 w-[150px] rounded-md text-white font-medium transition ease-in-out hover:scale-110 duration-300"
                type="submit"
              >
                Register
              </button>
            </div>
          </Form>
        </Formik>
        {submitMessage && <p>{submitMessage}</p>}
      </div>
    </div>
  );
};

export default Register;
