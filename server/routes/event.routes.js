const express = require("express");
const router = express.Router();

// Controller
const {
  eventsList,
  postEvent,
  eraseEvent,
  eventInformation,
  eventsPages,
  pageEvents,
  pendingEvents,
  acceptInvite,
  rejectInvite,
  eventByCategory,
} = require("../controllers/event.controller");

const { getInformationUser } = require("../models/AuthClass");

// Core
router.use("*", getInformationUser);
router.get("/", eventsList);
router.get("/category/:categoryId", eventByCategory);
router.post("/add", postEvent);
router.post("/delete", eraseEvent);
router.get("/details/:eventId", eventInformation);
router.get("/pages/:username", eventsPages);
router.get("/:username/:page", pageEvents);
router.get("/pending", pendingEvents);
router.post("/invite/accept", acceptInvite);
router.post("/invite/reject", rejectInvite);

module.exports = router;
