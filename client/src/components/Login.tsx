import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useContext } from "react";
import { UserContext } from "./UserContext";

import Logo from "./Logo";
import { API_URL, SESSION_KEY } from "../lib/constants";

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
      .post(`${API_URL}/user/login`, {
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
    <div className="h-[900px] p-[200px] border-t-8 border-secundary rounded-md">
      <div
        className="bloc rounded-lg mx-auto mb-0 shadow-lg border-t-8 border-primary"
        style={styles.formContainer}
      >
        <div className=" bg-white p-5">
          <Logo />
          <h1 className="text-center font-medium text-4xl">Log In</h1>
        </div>

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
                className="block mb-5 w-full p-1 rounded-sm border-2"
                id="username"
                name="username"
                placeholder="Username"
              />
            </div>

            <div className="block mb-5" style={styles.field}>
              <label htmlFor="password">Password</label>
              <Field
                className="block w-full p-1 rounded-sm border-2"
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>

            <div>
              <div className="mx-auto w-fit">
                <button
                  className="bg-primary p-2 px-3 w-[150px] rounded-md text-white font-medium"
                  type="submit"
                >
                  Enter
                </button>
                <div className="flex m-auto justify-between items-center mt-4">
                  <hr className="border-[1px] w-[50px]" />
                  <p className="text-gray-200 font-bold">Or</p>
                  <hr className="border-[1px] w-[50px]" />
                </div>
                <button
                  className="bg-primary p-2 px-3 w-[150px] rounded-md text-white font-medium mt-4"
                  type="button"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </Form>
        </Formik>
        {submitMessage && <p>{submitMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
