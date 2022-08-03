const { getEvents, addEvent } = require("../models/EventClass");

controller = {};

controller.eventsList = async (req, res) => {
  const user = req.user;

  const events = await getEvents(user);

  res.send(events);
};

controller.postEvent = async (req, res) => {
  const user = req.user;

  const event = req.body.event;

  const events = await addEvent(event, user);

  res.send(events);
};

module.exports = controller;
