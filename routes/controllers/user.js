const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

require('dotenv').config()

const createUser = async (req, res) => {
  try {
    const { name, last_name, email, password, image } = req.body;

    const connection = mysql.createConnection(process.env.DATABASE_URL);
    const encryptedPassword = await bcrypt.hash(password, 10);


    connection.query(
      "INSERT INTO `users` ( name, last_name, email, password, image ) VALUES (?, ?, ?, ?, ?)",
      [name, last_name, email, encryptedPassword, image],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw ("no se ha podido añadir el usuario")
        }

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
    console.error(e);
    res.status(400).json({
      message: e
    })
  }
}

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT id, name, password FROM `users` WHERE email = ?",
      [email],
      function (err, results, fields) {

        if (err) {
          throw (JSON.stringify(err))
        }
        if (results.length === 0) {
          throw ("user not found")
        }

        const user = results[0];

        if (!bcrypt.compareSync(password, user.password)) {
          throw ("password incorrect")
        }

        const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_KEY);  // creamos el token con el payload y la clave secreta

        res.status(200).json({
          "accessToken": token,
        })
      }
    );

  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: e
    })
  }
}

const getUserData = async (req, res) => {
  const { id } = req.query;

  if (id) {
    await getUserById(req, res)
  } else {
    await getAllUsers(req, res)
  }
}

function getAllUsers (req, res) {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT id, name, last_name, email FROM `users`",
      [],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no hay usuarios"
        }

        res.status(200).json(results)
      }
    );

  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: e
    })
  }
}

function getUserById(req, res) {
  try {
    const { id } = req.query;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT id, name, last_name, email FROM `users` WHERE id = ?",
      [id],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no hay usuarios"
        }

        res.status(200).json(results)
      }
    );

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
  getAllUserFriends,
  getUserData
};
