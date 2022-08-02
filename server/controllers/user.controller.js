const {
  registerUser,
  loginUser,
  getInformationUser,
  getInformationViewer,
  getUserDetails,
  getFriends,
  getOwnerDetails,
} = require("../models/UserClass");

controller = {};

controller.userLogin = async (req, res) => {
  const response = await loginUser(req.body);

  res.send(response);
};

controller.userRegister = async (req, res) => {
  const response = await registerUser(req.body);

  res.send(response);
};

controller.userInfo = async (req, res, next) => {
  req.user = await getInformationUser(req.headers.authorization);

  next();
};

controller.viewerInfo = async (req, res) => {
  const user = req.user;

  const viewer = await getInformationViewer(user);

  res.send(viewer);
};

controller.userDetailsByUsername = async (req, res) => {
  const user = await getUserDetails(req.params.username);

  res.send(user);
};

controller.ownerDetails = async (req, res) => {
  const user = await getOwnerDetails(req.params.userId);

  res.send(user);
};

controller.userFriends = async (req, res) => {
  const user = req.user;

  const friends = await getFriends(user);

  res.send(friends);
};

module.exports = controller;
