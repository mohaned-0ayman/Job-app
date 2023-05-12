const express = require("express");
const bcrypt = require("bcrypt");
const LoginRoute = express.Router();
const Employer = require("../models/Employer");
const Seeker = require("../models/Seeker");

// Create a middleware function that checks if the user is logged in
// const isLoggedIn = (req, res, next) => {
//   const dbModel =
//     req.url.split("/")[1].charAt(0).toUpperCase() +
//     req.url.split("/")[1].slice(1);
//   // Parse the cookies
//   const cookies = cookieParser(req);
//
//   // Get the session id from the cookies
//   const sessionId = cookies.session;
//
//   // Check if there is a session in the database with the same session id
//   const session = expressMysqlSession.getSessionById(req, sessionId);
//
//   // If there is a session, the user is already logged in, so redirect to the /user route
//   if (session) {
//     res.redirect(`/${dbModel}/${session.user.id}`);
//     return;
//   }
//   // No session, so log in normally
//   next();
// };

async function auth(req, res, next) {
  const dbModel =
    req.url.split("/")[1].charAt(0).toUpperCase() +
    req.url.split("/")[1].slice(1);
  const email = req.body.email;
  const password = req.body.password;

  const user = await eval(dbModel).findOne({ where: { email } });

  if (!user) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }
  req.user = user;
  next();
}

LoginRoute.get("/", async (req, res) => {
  if (req.cookies.session_id) {
    const user = req.session.user;
    const employer = await Employer.findOne({ where: { email: user.email } });
    if (employer) {
      res.status(200).redirect(`/employer/${user.id}`);
      return;
    }
    const seeker = await Seeker.findOne({ where: { email: user.email } });
    if (seeker) {
      res.status(200).redirect(`/seeker/${user.id}`);
      return;
    }
  }
  res.status(200).render("login");
});

// Login as a jobseeker
LoginRoute.post("/seeker", auth, async (req, res) => {
  req.session.user = req.user;
  res.cookie("session_id", req.session.id, {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
  });
  res.status(200).redirect(`/seeker/${req.user.id}`);
});

// Login as an employer
LoginRoute.post("/employer", auth, async (req, res) => {
  req.session.user = req.user;
  res.cookie("session_id", req.session.id, {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
  });
  res.status(200).redirect(`/employer/${req.user.id}`);
});

module.exports = LoginRoute;
