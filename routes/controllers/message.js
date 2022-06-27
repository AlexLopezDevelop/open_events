const mysql = require("mysql2");

const createMessage = async (req, res) => {
  try {
    const { content, user_id_send, user_id_recived } = req.body;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "INSERT INTO `message` ( content, user_id_send, user_id_recived, timeStamp ) VALUES (?, ?, ?, CURDATE())",
      [content, user_id_send, user_id_recived],
      function (err, results, fields) {

        if (err) res.status(400).json({});
        if (results.length === 0) {
          res.status(400).json({})
        }

        connection.query(
          "SELECT id, content, user_id_send, user_id_recived, timeStamp FROM message ORDER BY id DESC LIMIT 1",
          [],
          function (err, results, fields) {

            if (err) res.status(400).json({});
            if (results.length === 0) {
              res.status(400).json({})
            }

            const {
              id,
              content,
              user_id_send,
              user_id_recived,
              timeStamp
            } = results[0]

            res.status(200).json({
              "id": id,
              "content": content,
              "user_id_send": user_id_send,
              "user_id_recived": user_id_recived,
              "timeStamp": timeStamp
            })

            connection.end();
          }
        );
      }
    );

  } catch (e) {
    res.status(400).json({
      message: e
    })
  }
}

const getMessages = async (req, res) => {
  try {
    const { USER_ID } = req

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT id, content, user_id_send, user_id_recived, timeStamp FROM `message` WHERE user_id_send = ? OR user_id_recived = ? ORDER BY id DESC",
      [USER_ID, USER_ID],
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

const getMessagesById = async (req, res) => {
  try {
    const { id } = req.params

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT id, content, user_id_send, user_id_recived, timeStamp FROM `message` WHERE id = ? ORDER BY id DESC",
      [id],
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

module.exports = { createMessage, getMessages, getMessagesById }
