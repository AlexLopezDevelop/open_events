const { getAllFriendsRequests, getAllFriends, createFriendRequest, acceptFriendRequest, rejectFriendRequest } = require("./controllers/friend");
const friendSettings = require('express').Router({ mergeParams: true });

friendSettings.get("/friends/requests", getAllFriendsRequests)
friendSettings.get("/friends", getAllFriends)
friendSettings.post("/friends/{id}", createFriendRequest)
friendSettings.put("/friends/{id}", acceptFriendRequest)
friendSettings.delete("/friends/{id}", rejectFriendRequest)

module.exports = friendSettings;
