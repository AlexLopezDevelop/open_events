const { getAssistance, createAssistance, editAssistance, deleteAssistance } = require("./controllers/assistance");
const { privateRoute } = require("../middleware/privateRoute");
const bodyParser = require('body-parser').json();
const assistanceSettings = require('express').Router({ mergeParams: true });

assistanceSettings.get("/:user_id/:event_id", privateRoute, bodyParser, getAssistance)
assistanceSettings.post("/:user_id/:event_id", privateRoute, bodyParser, createAssistance)
assistanceSettings.put("/:user_id/:event_id", privateRoute, bodyParser, editAssistance)
assistanceSettings.delete("/:user_id/:event_id", privateRoute, bodyParser, deleteAssistance)

module.exports = assistanceSettings;
