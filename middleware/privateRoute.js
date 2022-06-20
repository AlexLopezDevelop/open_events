const jwt = require("jsonwebtoken");

function privateRoute(req, res, next) {
  try {

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
     const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.USER_ID = decoded.id
      req.USER_NOMBRE = decoded.name
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }

    return next();
  } catch (e) {
    return res.status(403).send("Error Auth");
  }
}

module.exports = { privateRoute }
