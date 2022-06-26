const mysql = require("mysql2");
const moment = require('moment')

const createEvent = async (req, res) => {
  try {
    const { USER_ID } = req
    const { name, image, location, description, eventStart_date, eventEnd_date, n_participators, type } = req.body;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "INSERT INTO `events` ( name, owner_id, date, image, location, description, eventStart_date, eventEnd_date, n_participators, type ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, USER_ID, new Date(), image, location, description, eventStart_date, eventEnd_date, n_participators, type],
      function (err, results, fields) {

        if (err) res.status(400);
        if (results.length === 0) {
          res.status(400)
        }

        res.status(200).json({
          "name": name,
          "image": image,
          "location": location,
          "description": description,
          "eventStart_date": eventStart_date,
          "eventEnd_date": eventEnd_date,
          "n_participators": n_participators,
          "type": type
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

const getEventData = async (req, res) => {
  const { id } = req.query;

  if (id) {
    await getEventById(req, res)
  } else {
    await getAllFutureEvents(req, res)
  }
}

const getAllFutureEvents = async (req, res) => {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT  id, name, owner_id, date, image, location, description, eventStart_date, eventEnd_date, n_participators, slug, 'type' FROM `events` WHERE eventStart_date > CURDATE();",
      [],
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

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT  id, name, owner_id, date, image, location, description, eventStart_date, eventEnd_date, n_participators, slug, 'type' FROM `events` WHERE id = ?;",
      [id],
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

const getAllFutureEventsByScore = async (req, res) => {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT  id, name, owner_id, date, image, location, description, eventStart_date, eventEnd_date, n_participators, slug, 'type' FROM `events` ORDER BY eventStart_date DESC;",
      [],
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

const searchEvent = async (req, res) => {
  try {
    const { s } = req.body

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT  t1.id, t1.name, owner_id, date, t1.image, location, description, eventStart_date, eventEnd_date, n_participators, slug, 'type', t2.id, t2.name, t2.last_name, t2.email, t2.image FROM `events` t1 INNER JOIN users t2 WHERE t2.name = (?) OR t2.last_name = (?) OR t2.email = (?);",
      [s, s, s],
      function (err, results, fields) {

        if (err) res.status(400);
        if (results.length === 0) {
          res.status(400)
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

const editEvent = async (req, res) => {
  try {
    const { USER_ID } = req
    const { id } = req.query;
    const { name, image, location, description, eventStart_date, eventEnd_date, n_participators, type } = req.body;

    const connection = mysql.createConnection(process.env.DATABASE_URL);
    const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

    connection.query(
      "UPDATE `events` SET name = ?, date = CURDATE(), image = ?, location = ?, description = ?, eventStart_date = ?, eventEnd_date = ?, n_participators = ?, type = ? WHERE id = ? AND owner_id = ?",
      [name, image, location, description, eventStart_date, eventEnd_date, n_participators, type, id, USER_ID],
      function (err, results, fields) {

        if (err) res.status(400);
        if (results.length === 0 || results.affectedRows === 0) {
          res.status(400).json({
            message: "No se pudo editar el evento"
          })
        } else {
          res.status(200).json({
            "name": name,
            "owner_id": USER_ID,
            "date": date,
            "image": image,
            "location": location,
            "description": description,
            "eventStart_date": eventStart_date,
            "eventEnd_date": eventEnd_date,
            "n_participators": n_participators,
            "slug": null,
            "type": type
          })
        }
      }
    );

  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: e
    })
  }
}

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.query;
    const connection = mysql.createConnection(process.env.DATABASE_URL)

    connection.query(
      "DELETE FROM `events` WHERE id = ?;",
      [id],
      function (err, results, fields) {

        if (err) res.status(400);
        if (results.length === 0) {
          res.status(400)
        }

        res.status(200).json({
          "message": "Evento eliminado"
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

const getAllAssistancesById = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT t2.puntuation, t2.comentary, t3.id, t3.name, t3.last_name, t3.email 'type' FROM `events` t1 INNER JOIN assistance t2 ON t1.id = t2.event_id INNER JOIN users t3 ON t1.owner_id = t3.id WHERE t1.id = ?",
      [id],
      function (err, results, fields) {

        if (err) res.status(400);
        if (results.length === 0) {
          res.status(400)
        }

        const events = []

        for (let i = 0; i < results.length; i++) {
          const {
            id,
            name,
            last_name,
            email,
            puntuation,
            comentary
          } = results[i]

          events.push({
            "id": id,
            "name": name,
            "last_name": last_name,
            "email": email,
            "puntuation": puntuation,
            "comentary": comentary,
          })
        }

        res.status(200).json(events)
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

const getAssistance = async (req, res) => {
  try {
    const { event_id, user_id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT user_id, event_id, puntuation, comentary FROM `assistance` WHERE user_id = ? AND event_id = ?;",
      [user_id, event_id],
      function (err, results, fields) {

        if (err) res.status(400);
        if (results.length === 0) {
          res.status(400)
        }

        const events = []

        for (let i = 0; i < results.length; i++) {
          const {
            puntuation,
            comentary
          } = results[i]

          events.push({
            "user_id": user_id,
            "event_id": event_id,
            "puntuation": puntuation,
            "comentary": comentary
          })
        }

        res.status(200).json(events)
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
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "UPDATE `events` SET `n_participators` = `n_participators` + 1 WHERE `id` = ?",
      [id],
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

const editAssistance = async (req, res) => {
  try {
    const { id } = req.params;
    const { puntuation, comentary } = req.body;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "UPDATE `assistance` SET puntuation = ?, comentary = ? WHERE event_id = ?",
      [puntuation, comentary, id],
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

const deleteAssistance = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "UPDATE `events` SET `n_participators` = `n_participators` - 1 WHERE `id` = ?",
      [id],
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

module.exports = {
  createEvent,
  getAllFutureEvents,
  getEventById,
  getAllFutureEventsByScore,
  searchEvent,
  editEvent,
  deleteEvent,
  getAllAssistancesById,
  getAssistance,
  createAssistance,
  editAssistance,
  deleteAssistance,
  getEventData
}
