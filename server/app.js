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
    next();
  }
});

app.get("/viewer", async (req, res) => {
  const userID = req.user.id;
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
  const event_list = [];

  const Guests = Parse.Object.extend("Guests");
  const query = new Parse.Query(Guests);

  if (!req.user) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  try {
    const user = req.user;
    query.equalTo("guest", user);
    query.include(["event"]);
    const events = await query.find();

    events.map((item) => {
      if (item.get("event")) {
        event_list.push(item.get("event"));
      }
    });

    res.send(event_list);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.get("/users/invited/:eventId", async (req, res) => {
  console.log(req.params.eventId);

  const guestsList = [];

  const eventPointer = {
    __type: "Pointer",
    className: "Event",
    objectId: req.params.eventId,
  };

  const Guests = Parse.Object.extend("Guests");
  const query = new Parse.Query(Guests);

  if (!req.user) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  try {
    const user = req.user;
    query.equalTo("event", eventPointer);
    query.include(["guest"]);
    const guests = await query.find();

    guests.map((item) => {
      if (item.get("guest")) {
        guestsList.push(item.get("guest"));
      }
    });

    res.send(guestsList);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = app;
