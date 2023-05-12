const express = require("express");
const LogoutRoute = express.Router();

// logout user
LogoutRoute.post("/", async (req, res) => {
  // Destroy the session and remove the cookie
  req.session.destroy();
  res.clearCookie("session_id");
  res.status(200).redirect("/");
});

module.exports = LogoutRoute;
