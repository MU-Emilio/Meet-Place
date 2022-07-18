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

app.use("*", async (req, res, next) => {
  const myToken = req.headers.authorization;
  if (!myToken) {
    req.userID = null;
    next();
  } else {
    const query = new Parse.Query(Parse.Session);
    const user = await query.first({ sessionToken: myToken });
    req.user = user.get("user");
    req.userID = user.get("user").id;
    next();
  }
});

app.get("/viewer", async (req, res) => {
  const userID = req.userID;
  if (!userID) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  try {
    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", userID);
    const userObject = await query.first();
    res.send(userObject);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.get("/events", async (req, res) => {
  const event_ids = [];

  const Guests = Parse.Object.extend("Guests");
  const query = new Parse.Query(Guests);

  const Event = Parse.Object.extend("Event");
  const query_event = new Parse.Query(Event);

  if (!req.userID) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  try {
    const user = req.user;
    query.equalTo("guest", user);
    query.include(["event"]);
    const events = await query.find();

    events.map((item) => {
      event_ids.push(item.get("event"));
    });

    res.send(event_ids);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = app;
