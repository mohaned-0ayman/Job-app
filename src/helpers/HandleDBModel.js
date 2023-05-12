const Job = require("../models/Job");
const Employer = require("../models/Employer");

module.exports.HandleDBModel = (req, res, next) => {
  const route = req.url.split("/");
  if (route[1] === "api" && route[2] === "jobs") req.model = Job;
  else if (route[1] === "api" && route[2] === "employers") req.model = Employer;
  else if (route[1] === "api" && route[2] === "employers") req.model = Employer;
  next();
};
