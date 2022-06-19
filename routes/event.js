const {
  createEvent,
  getAllFutureEvents,
  getEventById,
  getAllFutureEventsByScore,
  searchEvent, editEvent, deleteEvent, getAllAssistancesById, getAssistance, createAssistance, editAssistance,
  deleteAssistance
} = require("./controllers/event");
const eventSettings = require('express').Router({ mergeParams: true });

eventSettings.post("", createEvent)
eventSettings.get("", getAllFutureEvents)
eventSettings.get("/{id}", getEventById)
eventSettings.get("/best", getAllFutureEventsByScore)
eventSettings.get("/search", searchEvent)
eventSettings.put("/{id}", editEvent)
eventSettings.delete("/{id}", deleteEvent)
eventSettings.get("/{id}/assistances", getAllAssistancesById)
eventSettings.get("/{event_id}/assistances/{user_id}", getAssistance)
eventSettings.post("/{id}/assistances", createAssistance)
eventSettings.put("/{id}/assistances", editAssistance)
eventSettings.delete("/{id}/assistances", deleteAssistance)

module.exports = eventSettings;
