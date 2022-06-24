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

        connection.end();
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

function getAllUsers(req, res) {
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

    connection.end();

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

    connection.end();

  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: e
    })
  }
}

const searchUser = async (req, res) => {
  try {
    const { s } = req.body

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT id, name, last_name, email FROM `users` WHERE name = (?) OR last_name = (?) OR email = (?)",
      [s, s, s],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no hay usuarios"
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

const getUserStatistics = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT user_id, event_id, puntuation, comentary FROM `assistance` WHERE user_id = ?",
      [id],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no hay usuarios"
        }

        res.status(200).json(results) // TODO: Calcualte statistics
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

const editUser = async (req, res) => {
  try {

    const { USER_ID } = req
    const { name, last_name, email, password, image } = req.body

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(password, salt);

    connection.query(
      "UPDATE `users` SET name = ?, last_name = ?, email = ?, password = ?, image = ? WHERE id = ?",
      [name, last_name, email, hash, image, USER_ID],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no se ha podido editar el usuario"
        }

        res.status(200).json({
          "name": name,
          "last_name": last_name,
          "email": email,
          "password": hash,
          "image": image
        })
      }
    );

  } catch (e) {
    res.status(400).json({
      message: e
    })
  }
}

const deleteAuthUser = async (req, res) => {
  try {
    const { USER_ID } = req

    const connection = mysql.createConnection(process.env.DATABASE_URL)

    connection.query(
      "DELETE FROM `users` WHERE id = ?;",
      [USER_ID],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no se ha podido borrar el usuario"
        }

        res.status(200)
      }
    );

    connection.end();
  } catch (e) {
    res.status(400)
  }
}

const getAllUserEvents = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT  id, name, owner_id, date, image, location, description, eventStart_date, eventEnd_date, n_participators, slug, 'type' FROM `events` WHERE owner_id = ?",
      [id],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no hay eventos"
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

const getUserFutureEvents = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT  id, name, owner_id, date, image, location, description, eventStart_date, eventEnd_date, n_participators, slug, 'type' FROM `events` WHERE eventStart_date > CURDATE();",
      [id],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no hay eventos"
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

const getUserPastEvents = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT  id, name, owner_id, date, image, location, description, eventStart_date, eventEnd_date, n_participators, slug, 'type' FROM `events` WHERE  eventEnd_date < CURDATE();",
      [id],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no hay eventos"
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

const getUserNowEvents = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT  id, name, owner_id, date, image, location, description, eventStart_date, eventEnd_date, n_participators, slug, 'type' FROM `events` WHERE eventStart_date <= CURDATE() AND eventEnd_date >= CURDATE();",
      [id],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no hay eventos"
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

const getAllUserEventsWithAssistances = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT  id, name, owner_id, date, image, location, description, eventStart_date, eventEnd_date, n_participators, slug, t2.user_id, t2.event_id, t2.puntuation, t2.comentary 'type' FROM `events` t1 INNER JOIN assistance t2 ON t1.owner_id = t2.user_id WHERE t1.owner_id = ?",
      [id],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no hay eventos"
        }

        const events = []

        for (let i = 0; i < results.length; i++) {
          const {
            id,
            name,
            owner_id,
            date,
            image,
            location,
            description,
            eventStart_date,
            eventEnd_date,
            n_participators,
            slug,
            type,
            comentary
          } = results[i]

          events.push({
            "id": id,
            "name": name,
            "owner_id": owner_id,
            "date": date,
            "image": image,
            "location": location,
            "description": description,
            "eventStart_date": eventStart_date,
            "eventEnd_date": eventEnd_date,
            "n_participators": n_participators,
            "slug": slug,
            "type": type,
            "comentary": comentary,
          })
        }

        res.status(200).json(events)
      }
    );

    connection.end();

  } catch (e) {
    res.status(400).json({
      message: e
    })
  }
}

const getAllUserFutureEventsWithAssistances = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT  id, name, owner_id, date, image, location, description, eventStart_date, eventEnd_date, n_participators, slug, t2.user_id, t2.event_id, t2.puntuation, t2.comentary 'type' FROM `events` t1 INNER JOIN assistance t2 ON t1.owner_id = t2.user_id WHERE t1.owner_id = ? AND eventStart_date > CURDATE()",
      [id],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no hay eventos"
        }

        const events = []

        for (let i = 0; i < results.length; i++) {
          const {
            id,
            name,
            owner_id,
            date,
            image,
            location,
            description,
            eventStart_date,
            eventEnd_date,
            n_participators,
            slug,
            type,
            comentary
          } = results[i]

          events.push({
            "id": id,
            "name": name,
            "owner_id": owner_id,
            "date": date,
            "image": image,
            "location": location,
            "description": description,
            "eventStart_date": eventStart_date,
            "eventEnd_date": eventEnd_date,
            "n_participators": n_participators,
            "slug": slug,
            "type": type,
            "comentary": comentary,
          })
        }

        res.status(200).json(events)
      }
    );

    connection.end();

  } catch (e) {
    res.status(400).json({
      message: e
    })
  }
}

const getAllUserPastEventsWithAssistances = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT  id, name, owner_id, date, image, location, description, eventStart_date, eventEnd_date, n_participators, slug, t2.user_id, t2.event_id, t2.puntuation, t2.comentary 'type' FROM `events` t1 INNER JOIN assistance t2 ON t1.owner_id = t2.user_id WHERE t1.owner_id = ? AND eventStart_date < CURDATE()",
      [id],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no hay eventos"
        }

        const events = []

        for (let i = 0; i < results.length; i++) {
          const {
            id,
            name,
            owner_id,
            date,
            image,
            location,
            description,
            eventStart_date,
            eventEnd_date,
            n_participators,
            slug,
            type,
            comentary
          } = results[i]

          events.push({
            "id": id,
            "name": name,
            "owner_id": owner_id,
            "date": date,
            "image": image,
            "location": location,
            "description": description,
            "eventStart_date": eventStart_date,
            "eventEnd_date": eventEnd_date,
            "n_participators": n_participators,
            "slug": slug,
            "type": type,
            "comentary": comentary,
          })
        }

        res.status(200).json(events)
      }
    );

    connection.end();

  } catch (e) {
    res.status(400).json({
      message: e
    })
  }
}

const getAllUserFriends = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = mysql.createConnection(process.env.DATABASE_URL);

    connection.query(
      "SELECT user_id, user_id_friend, status, t2.name, t2.last_name, t2.email, t2.image FROM friends t1 INNER JOIN users t2 ON t1.user_id_friend = t2.id WHERE user_id = ?",
      [id],
      function (err, results, fields) {

        if (err) throw err;
        if (results.length === 0) {
          throw "no hay amigos"
        }

        const friends = []

        for (let i = 0; i < results.length; i++) {
          const {
            user_id,
            name,
            last_name,
            email,
            image
          } = results[i]

          friends.push({
            "id": user_id,
            "name": name,
            "last_name": last_name,
            "email": email,
            "image": image,
          })
        }

        res.status(200).json(friends)
      }
    );

    connection.end();

  } catch (e) {
    res.status(400).json({
      message: e
    })
  }
}

module.exports = {
  createUser,
  authUser,
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
