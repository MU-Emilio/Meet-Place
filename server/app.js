require("dotenv").config();
const Parse = require("parse/node");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const APP_ID = process.env.APP_ID;
const JS_KEY = process.env.JS_KEY;
const MASTER_KEY = process.env.MASTER_KEY;

app.use(cors());

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(
  APP_ID, // Application ID
  JS_KEY, // Javascript key
  MASTER_KEY //  Master key
);

// Request the Log in passing the email and password
app.post("/users/login", async (req, res) => {
  const body = req.body;

  try {
    const user = await Parse.User.logIn(body.username, body.password);
    res.send({ message: "User logged!", status: "success", payload: user });
  } catch (error) {
    res
      .status(400)
      .send({ message: error.message, status: "danger", payload: body });
  }
});

// Register the user passing the username, password and email
app.post("/users/register", async (req, res) => {
  const body = req.body;
  const user = new Parse.User();

  user.set("username", body.username);
  user.set("password", body.password);
  if (body.email == null) {
    res.status(400).send({
      message: "Cannot register with empty email",
      status: "danger",
      payload: body,
    });
    return;
  }
  user.set("email", body.email);

  try {
    await user.signUp();
    res
      .status(200)
      .send({ message: "User created!", status: "success", payload: body });
  } catch (error) {
    res
      .status(400)
      .send({ message: error.message, status: "danger", payload: body });
  }
});

module.exports = app;
