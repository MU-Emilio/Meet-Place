const { getEvents } = require("../models/EventClass");

controller = {};

controller.eventsList = async (req, res) => {
  const events = await getEvents();

  res.send(events);
};

module.exports = controller;
