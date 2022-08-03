const express = require("express");
const router = express.Router();

// Controller
const { newGuest, eraseGuest } = require("../controllers/guest.controller");

const { getInformationUser } = require("../models/AuthClass");

// Core
router.use("*", getInformationUser);
router.post("/addGuest", newGuest);
router.post("/deleteGuest", eraseGuest);

module.exports = router;
