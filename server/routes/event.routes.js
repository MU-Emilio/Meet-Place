const express = require("express");
const router = express.Router();

// Controller
const { eventsList } = require("../controllers/event.controller");

const { getInformationUser } = require("../models/AuthClass");

// Core
router.use("*", getInformationUser);
router.get("/", eventsList);

module.exports = router;
