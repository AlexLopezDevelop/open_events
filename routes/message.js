const { createMessage, getMessages, getMessagesById } = require("./controllers/message");
const messageSettings = require('express').Router({ mergeParams: true });

messageSettings.post("", createMessage)
messageSettings.get("/users", getMessages)
messageSettings.post("/{id}", getMessagesById)

module.exports = messageSettings;
