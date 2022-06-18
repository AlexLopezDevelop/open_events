const {
  createUser, authUser, getAllUsers, getUserById, searchUser, getUserStatistics, editUser, deleteAuthUser,
  getAllUserEvents, getUserFutureEvents, getUserPastEvents, getUserNowEvents, getAllUserEventsWithAssistances,
  getAllUserFutureEventsWithAssistances, getAllUserPastEventsWithAssistances, getAllUserFriends
} = require("./controllers/user");
const userSettings = require('express').Router({ mergeParams: true });

userSettings.post("/users", createUser)
userSettings.post("/users/login", authUser)
userSettings.get("/users", getAllUsers)
userSettings.get("/users/{id}", getUserById)
userSettings.get("/users/search", searchUser)
userSettings.get("/users/{id}/statistics", getUserStatistics)
userSettings.put("/users", editUser)
userSettings.delete("/users", deleteAuthUser)
userSettings.get("/users/{id}/events", getAllUserEvents)
userSettings.get("/users/{id}/events/future", getUserFutureEvents)
userSettings.get("/users/{id}/events/finished", getUserPastEvents)
userSettings.get("/users/{id}/current", getUserNowEvents)
userSettings.get("/users/{id}/assistances", getAllUserEventsWithAssistances)
userSettings.get("/users/{id}/assistances/future", getAllUserFutureEventsWithAssistances)
userSettings.get("/users/{id}/assistances/finished", getAllUserPastEventsWithAssistances)
userSettings.get("/users/{id}/friends", getAllUserFriends)

module.exports = userSettings;
