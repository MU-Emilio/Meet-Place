import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form } from "formik";

import Logo from "./Logo";

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
      .post(`http://localhost:3001/users/register`, {
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
    <div className="h-[800px] p-[200px]">
      <div
        className="block bg-primary rounded-lg  mx-auto mb-0"
        style={styles.formContainer}
      >
        <Logo />
        <h1 className="text-center">Register</h1>
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
                className="block w-full"
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
                className="block w-full"
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
                className="block w-full"
                id="username"
                name="username"
                placeholder="Username"
              />
            </div>

            <div className="mb-5" style={styles.field}>
              <label htmlFor="password">Password</label>
              <Field
                className="block w-full"
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>

            <button className="bg-white px-3" type="submit">
              Submit
            </button>
          </Form>
        </Formik>
        {submitMessage && <p>{submitMessage}</p>}
      </div>
    </div>
  );
};

export default Register;
