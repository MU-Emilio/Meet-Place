const {
  getEvents,
  addEvent,
  deleteEvent,
  getEventInfo,
} = require("../models/EventClass");

controller = {};

controller.eventsList = async (req, res) => {
  const user = req.user;

  const events = await getEvents(user);

  res.send(events);
};

controller.postEvent = async (req, res) => {
  const user = req.user;

  const event = req.body.event;

  const eventObject = await addEvent(event, user);

  res.send(eventObject);
};

controller.eraseEvent = async (req, res) => {
  const user = req.user;

  const event = req.body.event;

  const eventObject = await deleteEvent(event, user);

  res.send(eventObject);
};

controller.eventInformation = async (req, res) => {
  const user = req.user;

  const eventId = req.params.eventId;

  const eventObject = await getEventInfo(eventId, user);

  res.send(eventObject);
};

module.exports = controller;
