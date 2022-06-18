const { createMessage, getMessages, getMessagesById } = require("./controllers/message");
const messageSettings = require('express').Router({ mergeParams: true });

messageSettings.post("/messages", createMessage)
messageSettings.get("/messages/users", getMessages)
messageSettings.post("/messages/{id}", getMessagesById)

module.exports = messageSettings;
