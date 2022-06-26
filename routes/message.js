const { createMessage, getMessages, getMessagesById } = require("./controllers/message");
const { privateRoute } = require("../middleware/privateRoute");
const messageSettings = require('express').Router({ mergeParams: true });
const bodyParser = require('body-parser').json();

messageSettings.post("", privateRoute, bodyParser, createMessage)
messageSettings.get("/users", privateRoute, bodyParser, getMessages)
messageSettings.get("/:id", privateRoute, bodyParser, getMessagesById)

module.exports = messageSettings;
