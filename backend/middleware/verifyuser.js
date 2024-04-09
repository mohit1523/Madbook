const jwt = require("jsonwebtoken");
const JWT_SECRET = "Mohit@123";

const verifyuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (token) {
    try {
        const data = jwt.verify(token , JWT_SECRET);
        req.curruser = data.user;
        next();
    } catch (error) {
      console.error(error)
      res.status(400).send({ msg: "Please authenticate using valid token" });
    }
  } else {
    res.status(400).send({ msg: "Please authenticate using valid token" });
  }
};

module.exports = verifyuser;
