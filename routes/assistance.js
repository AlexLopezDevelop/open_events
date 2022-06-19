const { getAssistance, createAssistance, editAssistance, deleteAssistance } = require("./controllers/assistance");
const assistanceSettings = require('express').Router({ mergeParams: true });

assistanceSettings.get("/{user_id}/{event_id}", getAssistance)
assistanceSettings.post("/{user_id}/{event_id}", createAssistance)
assistanceSettings.put("/{user_id}/{event_id}", editAssistance)
assistanceSettings.delete("/{user_id}/{event_id}", deleteAssistance)

module.exports = assistanceSettings;
