const express = require("express");
const router = express.Router();

// Controller
const { categoryDetails } = require("../controllers/category.controller");

const { getInformationUser } = require("../models/AuthClass");

// Core
router.use("*", getInformationUser);
router.get("/:categoryId", categoryDetails);

module.exports = router;
