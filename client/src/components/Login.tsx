import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useContext } from "react";
import { UserContext } from "./UserContext";

import Logo from "./Logo";
import { SESSION_KEY } from "../lib/constants";

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
}

const Login = () => {
  const [submitMessage, setSubmitMessage] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Handlers
  const handleLogin = (values: any, callback: () => void) => {
    axios
      .post(`http://localhost:3001/users/login`, {
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        setSubmitMessage(response.data.message);
        localStorage.setItem(SESSION_KEY, response.data.payload.sessionToken);
        setUser(response.data.payload.sessionToken);
        callback();
        navigate("/home");
      })
      .catch((error) => {
        setSubmitMessage(error.response.data.message);
      });
  };

  return (
    <div className="h-[800px] p-[200px]">
      <div
        className="block bg-primary rounded-lg mx-auto mb-0"
        style={styles.formContainer}
      >
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
                className="block mb-5 w-full"
                id="username"
                name="username"
                placeholder="Username"
              />
            </div>

            <div className="block mb-5" style={styles.field}>
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
        <p>Need an account?</p>
        <p className=" underline" onClick={() => navigate("/register")}>
          Sign up
        </p>
      </div>
    </div>
  );
};

export default Login;
