const {
  createUser, authUser, getAllUsers, getUserById, searchUser, getUserStatistics, editUser, deleteAuthUser,
  getAllUserEvents, getUserFutureEvents, getUserPastEvents, getUserNowEvents, getAllUserEventsWithAssistances,
  getAllUserFutureEventsWithAssistances, getAllUserPastEventsWithAssistances, getAllUserFriends
} = require("./controllers/user");
const userSettings = require('express').Router({ mergeParams: true });
const bodyParser = require('body-parser').json();
/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management
 */


userSettings.post("", bodyParser, createUser)
userSettings.post("/login", authUser)
userSettings.get("", getAllUsers)
userSettings.get("/{id}", getUserById)
userSettings.get("/search", searchUser)
userSettings.get("/{id}/statistics", getUserStatistics)
userSettings.put("", editUser)
userSettings.delete("", deleteAuthUser)
userSettings.get("/{id}/events", getAllUserEvents)
userSettings.get("/{id}/events/future", getUserFutureEvents)
userSettings.get("/{id}/events/finished", getUserPastEvents)
userSettings.get("/{id}/current", getUserNowEvents)
userSettings.get("/{id}/assistances", getAllUserEventsWithAssistances)
userSettings.get("/{id}/assistances/future", getAllUserFutureEventsWithAssistances)
userSettings.get("/{id}/assistances/finished", getAllUserPastEventsWithAssistances)
userSettings.get("/{id}/friends", getAllUserFriends)

module.exports = userSettings;
