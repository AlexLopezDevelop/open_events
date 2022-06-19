const mysql = require("mysql2");
require('dotenv').config()

const createUser = async (req, res) => {
  try {
    let { name, last_name, email, password, image } = req.body;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "INSERT INTO `users` ( name, last_name, email, password, image ) VALUES (?, ?, ?, ?, ?)",
      [name, last_name, email, password, image],
      function (err, results, fields) {

        if (err) return res.json({ error: err });
        if (results.length === 0) { Error ("no se ha podido añadir el usuario")}

        res.status(200).json({
          "name": name,
          "last_name": last_name,
          "email": email,
          "image": image
        })
      }
    );

    connection.end();

  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: e
    })
  }
}

const authUser = async (req, res) => {
  try {

  } catch (e) {

  }
}

const getAllUsers = async (req, res) => {
  try {

  } catch (e) {

  }
}

const getUserById = async (req, res) => {
  try {

  } catch (e) {

  }
}

const searchUser = async (req, res) => {
  try {

  } catch (e) {

  }
}

const getUserStatistics = async (req, res) => {
  try {

  } catch (e) {

  }
}

const editUser = async (req, res) => {
  try {

  } catch (e) {

  }
}

const deleteAuthUser = async (req, res) => {
  try {

  } catch (e) {

  }
}

const getAllUserEvents = async (req, res) => {
  try {

  } catch (e) {

  }
}

const getUserFutureEvents = async (req, res) => {
  try {

  } catch (e) {

  }
}

const getUserPastEvents = async (req, res) => {
  try {

  } catch (e) {

  }
}

const getUserNowEvents = async (req, res) => {
  try {

  } catch (e) {

  }
}

const getAllUserEventsWithAssistances = async (req, res) => {
  try {

  } catch (e) {

  }
}

const getAllUserFutureEventsWithAssistances = async (req, res) => {
  try {

  } catch (e) {

  }
}

const getAllUserPastEventsWithAssistances = async (req, res) => {
  try {

  } catch (e) {

  }
}

const getAllUserFriends = async (req, res) => {
  try {

  } catch (e) {

  }
}

module.exports = {
  createUser,
  authUser,
  getAllUsers,
  getUserById,
  searchUser,
  getUserStatistics,
  editUser,
  deleteAuthUser,
  getAllUserEvents,
  getUserFutureEvents,
  getUserPastEvents,
  getUserNowEvents,
  getAllUserEventsWithAssistances,
  getAllUserFutureEventsWithAssistances,
  getAllUserPastEventsWithAssistances,
  getAllUserFriends
};
