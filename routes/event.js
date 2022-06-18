const {
  createEvent,
  getAllFutureEvents,
  getEventById,
  getAllFutureEventsByScore,
  searchEvent, editEvent, deleteEvent, getAllAssistancesById, getAssistance, createAssistance, editAssistance,
  deleteAssistance
} = require("./controllers/event");
const eventSettings = require('express').Router({ mergeParams: true });

eventSettings.post("/events", createEvent)
eventSettings.get("/events", getAllFutureEvents)
eventSettings.get("/events/{id}", getEventById)
eventSettings.get("/events/best", getAllFutureEventsByScore)
eventSettings.get("/events/search", searchEvent)
eventSettings.put("/events/{id}", editEvent)
eventSettings.delete("/events/{id}", deleteEvent)
eventSettings.get("/events/{id}/assistances", getAllAssistancesById)
eventSettings.get("/events/{event_id}/assistances/{user_id}", getAssistance)
eventSettings.post("/events/{id}/assistances", createAssistance)
eventSettings.put("/events/{id}/assistances", editAssistance)
eventSettings.delete("/events/{id}/assistances", deleteAssistance)

module.exports = eventSettings;
