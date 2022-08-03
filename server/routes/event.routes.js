const express = require("express");
const router = express.Router();

// Controller
const {
  eventsList,
  postEvent,
  eraseEvent,
  eventInformation,
  eventsPages,
} = require("../controllers/event.controller");

const { getInformationUser } = require("../models/AuthClass");

// Core
router.use("*", getInformationUser);
router.get("/", eventsList);
router.post("/add", postEvent);
router.post("/delete", eraseEvent);
router.get("/details/:eventId", eventInformation);
router.get("/pages/:username", eventsPages);

module.exports = router;
