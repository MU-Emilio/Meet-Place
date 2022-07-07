import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, FormikHelpers } from "formik";

import Logo from "./Logo";

// Styles

const styles = {
  formContainer: {
    height: "max-content",
    width: "max-content",
    margin: "100px auto",
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
}

const Login = () => {
  const [submitMessage, setSubmitMessage] = useState(null);

  return (
    <div className="block bg-primary rounded-lg" style={styles.formContainer}>
      <Logo />
      <h1 className="text-center">Login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          axios
            .post(`http://localhost:3001/users/login`, {
              usernameLogin: values.username,
              passwordLogin: values.password,
            })
            .then((response) => {
              console.log(response.data);
              setSubmitMessage(response.data.status);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        <Form style={styles.form}>
          <div style={styles.field}>
            <label className="block" htmlFor="username">
              Username
            </label>
            <Field
              className="block mb-5"
              id="username"
              name="username"
              placeholder="Username"
            />
          </div>

          <div className="block mb-5" style={styles.field}>
            <label htmlFor="password">Password</label>
            <Field
              className="block"
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
  );
};

export default Login;
