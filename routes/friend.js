const { getAllFriendsRequests, getAllFriends, createFriendRequest, acceptFriendRequest, rejectFriendRequest } = require("./controllers/friend");
const { privateRoute } = require("../middleware/privateRoute");
const friendSettings = require('express').Router({ mergeParams: true });
const bodyParser = require('body-parser').json();


friendSettings.get("/requests", privateRoute, bodyParser, getAllFriendsRequests)
friendSettings.get("", privateRoute, bodyParser, getAllFriends)
friendSettings.post("/:id", createFriendRequest)
friendSettings.put("/:id", acceptFriendRequest)
friendSettings.delete("/:id", rejectFriendRequest)

module.exports = friendSettings;
