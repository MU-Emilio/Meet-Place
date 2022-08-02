const express = require("express");
const router = express.Router();

// Controller
const {
  userLogin,
  userRegister,
  getUser,
  getViewer,
  getUserDetails,
  getOwnerDetails,
  getFriends,
  getNotFriends,
} = require("../controllers/user.controller");

// Core
router.post("/login", userLogin);
// router.post("/register", userRegister);
// router.use("*", getUser);
// router.get("/viewer", getViewer);
// router.get("/:username", getUserDetails);
// router.get("/owner/:userId", getOwnerDetails);
// router.get("/friends", getFriends);
// router.get("/friends/notFriends", getNotFriends);

module.exports = router;
