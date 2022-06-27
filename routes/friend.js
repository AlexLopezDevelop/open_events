const { getAllFriendsRequests, getAllFriends, createFriendRequest, acceptFriendRequest, rejectFriendRequest } = require("./controllers/friend");
const { privateRoute } = require("../middleware/privateRoute");
const friendSettings = require('express').Router({ mergeParams: true });
const bodyParser = require('body-parser').json();


friendSettings.get("/requests", privateRoute, bodyParser, getAllFriendsRequests)
friendSettings.get("", privateRoute, bodyParser, getAllFriends)
friendSettings.post("/:id", privateRoute, bodyParser, createFriendRequest)
friendSettings.put("/:id", privateRoute, bodyParser, acceptFriendRequest)
friendSettings.delete("/:id", privateRoute, bodyParser, rejectFriendRequest)

module.exports = friendSettings;
