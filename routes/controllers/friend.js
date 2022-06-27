const mysql = require("mysql2");

const getAllFriendsRequests = async (req, res) => {
  try {
    const { USER_ID } = req

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT t2.id, t2.name, t2.last_name, t2.email, t2.image FROM `friends` t1 INNER JOIN users t2 ON t1.user_id = t2.id WHERE t1.user_id_friend = ? ORDER BY id DESC",
      [USER_ID],
      function (err, results, fields) {

        if (err) res.status(400).json({});
        if (results.length === 0) {
          res.status(400).json({})
        }

        res.status(200).json(results)
      }
    );

    connection.end();

  } catch (e) {
    res.status(400).json({
      message: e
    })
  }
}

const getAllFriends = async (req, res) => {
  try {
    const { USER_ID } = req

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT t2.id, t2.name, t2.last_name, t2.email, t2.image FROM `friends` t1 INNER JOIN users t2 ON t1.user_id_friend = t2.id WHERE user_id = ? ORDER BY id DESC",
      [USER_ID],
      function (err, results, fields) {

        if (err) res.status(400).json({});
        if (results.length === 0) {
          res.status(400).json({})
        }

        res.status(200).json(results)
      }
    );

    connection.end();

  } catch (e) {
    res.status(400).json({
      message: e
    })
  }
}

const createFriendRequest = async (req, res) => {
  try {
    const { USER_ID } = req
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "INSERT INTO `friends` ( user_id, user_id_friend, status ) VALUES (?, ?, 0)",
      [USER_ID, id],
      function (err, results, fields) {

        if (err) {
          res.status(400).json({})
        }
        if (results.length === 0) {
          res.status(400).json({})
        }

        res.status(200).json(results)

      });

    connection.end();

  } catch (e) {
    res.status(400).json({
      message: e
    })
  }
}

const acceptFriendRequest = async (req, res) => {
  try {
    const { USER_ID } = req
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "UPDATE `friends` SET status = ? WHERE user_id = ? AND user_id_friend = ?",
      [1, id, USER_ID],
      function (err, results, fields) {

        if (err) res.status(400).json({});
        if (results.length === 0) {
          res.status(400).json({})
        }

        res.status(200).json(results)
      }
    );

    connection.end();

  } catch (e) {
    res.status(400).json({
      message: e
    })
  }
}

const rejectFriendRequest = async (req, res) => {
  try {
    const { USER_ID } = req
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "UPDATE `friends` SET status = ? WHERE user_id = ? AND user_id_friend = ?",
      [-1, id, USER_ID],
      function (err, results, fields) {

        if (err) res.status(400).json({});
        if (results.length === 0) {
          res.status(400).json({})
        }

        res.status(200).json(results)
      }
    );

    connection.end();
  } catch (e) {
    res.status(400).json({
      message: e
    })
  }
}

module.exports = { getAllFriendsRequests, getAllFriends, createFriendRequest, acceptFriendRequest, rejectFriendRequest }
