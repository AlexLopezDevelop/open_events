const mysql = require("mysql2");

const getAssistance = async (req, res) => {
  try {
    const { user_id, event_id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT user_id, event_id, puntuation, comentary FROM `assistance` WHERE user_id = ? AND event_id = ?",
      [user_id, event_id],
      function (err, results, fields) {

        if (err) res.status(400);
        if (results.length === 0) {
          res.status(400)
        }

        res.status(200).json(results)
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

const createAssistance = async (req, res) => {
  try {
    const { user_id, event_id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "INSERT INTO `assistance` ( user_id, event_id ) VALUES (?, ?)",
      [user_id, event_id],
      function (err, results, fields) {

        if (err) res.status(400);
        if (results.length === 0) {
          res.status(400)
        }

        res.status(200).json({})
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


const editAssistance = async (req, res) => {
  try {
    const { user_id, event_id } = req.params;
    const { puntuation, comentary } = req.body;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "UPDATE `assistance` SET puntuation = ?, comentary = ? WHERE user_id = ? AND event_id = ?",
      [puntuation, comentary, user_id, event_id],
      function (err, results, fields) {

        if (err) res.status(400);
        if (results.length === 0) {
          res.status(400)
        }

        res.status(200).json({})
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

const deleteAssistance = async (req, res) => {
  try {
    const { user_id, event_id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "DELETE FROM `assistance` WHERE user_id = ? AND event_id = ?;",
      [user_id, event_id],
      function (err, results, fields) {

        if (err) res.status(400);
        if (results.length === 0) {
          res.status(400)
        }

        res.status(200).json({})
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

module.exports = { getAssistance, createAssistance, editAssistance, deleteAssistance };
