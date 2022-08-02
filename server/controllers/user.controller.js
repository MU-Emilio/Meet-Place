const {
  registerUser,
  loginUser,
  getInformationUser,
  getInformationViewer,
  getUserDetails,
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

controller.getUser = async (req, res, next) => {
  req.user = await getInformationUser(req.headers.authorization);

  next();
};

controller.getViewer = async (req, res) => {
  const user = req.user;

  const viewer = await getInformationViewer(user);

  res.send(viewer);
};

controller.getDetailsUser = async (req, res) => {
  const user = await getUserDetails(req.params.username);

  res.send(user);
};

module.exports = controller;
