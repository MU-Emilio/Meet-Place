const express = require("express");
const router = express.Router();

// Controller
const {
  newGuest,
  eraseGuest,
  availableFriends,
  eventGuests,
} = require("../controllers/guest.controller");

const { getInformationUser } = require("../models/AuthClass");

// Core
router.use("*", getInformationUser);
router.post("/addGuest", newGuest);
router.post("/deleteGuest", eraseGuest);
router.get("/invited/:eventId", eventGuests);
router.get("/available/:date", availableFriends);

module.exports = router;
