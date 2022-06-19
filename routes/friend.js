const { getAllFriendsRequests, getAllFriends, createFriendRequest, acceptFriendRequest, rejectFriendRequest } = require("./controllers/friend");
const friendSettings = require('express').Router({ mergeParams: true });

friendSettings.get("/requests", getAllFriendsRequests)
friendSettings.get("", getAllFriends)
friendSettings.post("/{id}", createFriendRequest)
friendSettings.put("/{id}", acceptFriendRequest)
friendSettings.delete("/{id}", rejectFriendRequest)

module.exports = friendSettings;
