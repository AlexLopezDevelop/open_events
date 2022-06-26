const {
  createEvent,
  getEventData,
  getAllFutureEventsByScore,
  searchEvent, editEvent, deleteEvent, getAllAssistancesById, getAssistance, createAssistance, editAssistance,
  deleteAssistance
} = require("./controllers/event");
const { privateRoute } = require("../middleware/privateRoute");
const eventSettings = require('express').Router({ mergeParams: true });
const bodyParser = require('body-parser').json();

eventSettings.post("", privateRoute, bodyParser, createEvent)
eventSettings.get("", privateRoute, bodyParser, getEventData)
eventSettings.get("/best", privateRoute, bodyParser, getAllFutureEventsByScore)
eventSettings.get("/search", privateRoute, bodyParser, searchEvent)
eventSettings.put("", privateRoute, bodyParser, editEvent)
eventSettings.delete("", privateRoute, bodyParser, deleteEvent)
eventSettings.get("/:id/assistances", privateRoute, bodyParser, getAllAssistancesById)
eventSettings.get("/:event_id/assistances/:user_id", privateRoute, bodyParser, getAssistance)
eventSettings.post("/:id/assistances", createAssistance)
eventSettings.put("/:id/assistances", editAssistance)
eventSettings.delete("/:id/assistances", deleteAssistance)

module.exports = eventSettings;
