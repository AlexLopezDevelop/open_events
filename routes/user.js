const {
  createUser, authUser, getAllUsers, getUserById, searchUser, getUserStatistics, editUser, deleteAuthUser,
  getAllUserEvents, getUserFutureEvents, getUserPastEvents, getUserNowEvents, getAllUserEventsWithAssistances,
  getAllUserFutureEventsWithAssistances, getAllUserPastEventsWithAssistances, getAllUserFriends
} = require("./controllers/user");
const { privateRoute } = require("../middleware/privateRoute");
const userSettings = require('express').Router({ mergeParams: true });
const bodyParser = require('body-parser').json();
/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management
 */


userSettings.post("", bodyParser, createUser)
userSettings.post("/login", bodyParser, authUser)
userSettings.get("", privateRoute, getAllUsers)
userSettings.get("/{id}", bodyParser, getUserById)
userSettings.get("/search", bodyParser, searchUser)
userSettings.get("/{id}/statistics", bodyParser, getUserStatistics)
userSettings.put("", bodyParser, editUser)
userSettings.delete("", bodyParser, deleteAuthUser)
userSettings.get("/{id}/events", bodyParser, getAllUserEvents)
userSettings.get("/{id}/events/future", bodyParser, getUserFutureEvents)
userSettings.get("/{id}/events/finished", bodyParser, getUserPastEvents)
userSettings.get("/{id}/current", bodyParser, getUserNowEvents)
userSettings.get("/{id}/assistances", bodyParser, getAllUserEventsWithAssistances)
userSettings.get("/{id}/assistances/future", bodyParser, getAllUserFutureEventsWithAssistances)
userSettings.get("/{id}/assistances/finished", bodyParser, getAllUserPastEventsWithAssistances)
userSettings.get("/{id}/friends", bodyParser, getAllUserFriends)

module.exports = userSettings;
