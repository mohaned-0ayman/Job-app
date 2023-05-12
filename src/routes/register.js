const express = require("express");
const bcrypt = require("bcrypt");
const Seeker = require("../models/Seeker");
const Employer = require("../models/Employer");
const RegisterRoute = express.Router();

function hashPassword(req, res, next) {
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(password, salt);
  next();
}

RegisterRoute.get("/", (req, res) => {
  res.status(200).render("register");
});

// Add new jobseeker
RegisterRoute.post("/seeker", hashPassword, (req, res) => {
  Seeker.create({ ...req.body })
    .then(() => res.status(200).redirect("/login"))
    .catch((err) => res.status(500).json(err.message));
});

// Add new employer
RegisterRoute.post("/employer", hashPassword, (req, res) => {
  Employer.create({ ...req.body })
    .then(() => res.status(200).redirect("/login"))
    .catch((err) => res.status(500).json(err.message));
});

module.exports = RegisterRoute;
