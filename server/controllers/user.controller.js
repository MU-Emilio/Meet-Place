const {
  registerUser,
  loginUser,
  getUser,
  getViewer,
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
  req.user = await getUser(req.headers.authorization);

  next();
};

controller.getViewer = async (req, res) => {
  const user = req.user;

  const viewer = await getViewer(user);

  res.send(viewer);
};

controller;

module.exports = controller;
