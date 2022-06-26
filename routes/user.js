const {
  createUser, authUser, searchUser, getUserStatistics, editUser, deleteAuthUser,
  getAllUserEvents, getUserFutureEvents, getUserPastEvents, getUserNowEvents, getAllUserEventsWithAssistances,
  getAllUserFutureEventsWithAssistances, getAllUserPastEventsWithAssistances, getAllUserFriends, getUserData
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
userSettings.get("", privateRoute, getUserData)
userSettings.get("/search", privateRoute, bodyParser, searchUser)
userSettings.get("/:id/statistics", privateRoute, getUserStatistics)
userSettings.put("", privateRoute, bodyParser, editUser)
userSettings.delete("", privateRoute, bodyParser, deleteAuthUser)
userSettings.get("/:id/events", bodyParser, getAllUserEvents)
userSettings.get("/:id/events/future", bodyParser, getUserFutureEvents)
userSettings.get("/:id/events/finished", bodyParser, getUserPastEvents)
userSettings.get("/:id/events/current", bodyParser, getUserNowEvents)
userSettings.get("/:id/assistances", bodyParser, getAllUserEventsWithAssistances)
userSettings.get("/:id/assistances/future", bodyParser, getAllUserFutureEventsWithAssistances)
userSettings.get("/:id/assistances/finished", bodyParser, getAllUserPastEventsWithAssistances)
userSettings.get("/:id/friends", bodyParser, getAllUserFriends)

module.exports = userSettings;
