import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface Values {
    username: string;
    password: string;
  }

const Login = () => {

    const [submitError, setSubmitError] = useState('');
    
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
            axios.post(`http://localhost:3001/users/login`, {
                usernameLogin: values.username,
                passwordLogin: values.password
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }}
      >
        <Form>
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" placeholder="Username" />

          <label htmlFor="password">Password</label>
          <Field
            id="password"
            name="password"
            placeholder="Password"
            type="password"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login