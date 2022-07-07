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

  // Handlers
  const handleLogin = (values: any, callback: () => void) => {
    axios
      .post(`http://localhost:3001/users/login`, {
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        setSubmitMessage(response.data.message);
        if (response.data.status === "success") {
          callback();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="block bg-primary rounded-lg" style={styles.formContainer}>
      <Logo />
      <h1 className="text-center">Login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values: Values, { resetForm }) => {
          handleLogin(values, () => resetForm());
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
