require("dotenv").config();
const Parse = require("parse/node");
const express = require("express");
const app = express();
const cors = require("cors");
// const { SESSION_KEY } = require("../client/src/lib/constants");
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

// Erase currrent sessionToken from localstorage
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

app.use("/viewer", async (req, res, next) => {
  const myToken = req.headers.authorization;
  const query = new Parse.Query(Parse.Object.extend("User"));

  try {
    const user = await query.first("sessionToken", myToken);
    // res.send(user.id);
    req.userID = user.id;
    next();
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.get("/viewer", async (req, res) => {
  const userID = req.userID;
  const query = new Parse.Query(Parse.User);
  try {
    query.equalTo("objectId", userID);
    const userObject = await query.first({ objectId: userID });
    res.send(userObject);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = app;
