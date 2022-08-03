const express = require("express");
const router = express.Router();

// Controller
const { eventsList, postEvent } = require("../controllers/event.controller");

const { getInformationUser } = require("../models/AuthClass");

// Core
router.use("*", getInformationUser);
router.get("/", eventsList);
router.post("/add", postEvent);

module.exports = router;
