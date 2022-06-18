const { getAssistance, createAssistance, editAssistance, deleteAssistance } = require("./controllers/assistance");
const assistanceSettings = require('express').Router({ mergeParams: true });

assistanceSettings.get("/assistances/{user_id}/{event_id}", getAssistance)
assistanceSettings.post("/assistances/{user_id}/{event_id}", createAssistance)
assistanceSettings.put("/assistances/{user_id}/{event_id}", editAssistance)
assistanceSettings.delete("/assistances/{user_id}/{event_id}", deleteAssistance)

module.exports = assistanceSettings;
