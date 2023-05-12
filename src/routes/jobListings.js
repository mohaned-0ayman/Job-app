const express = require("express");
const JobListingsRoute = express.Router();
const Job = require("../models/Job");

JobListingsRoute.get("/", async (req, res) => {
  const jobs = await Job.findAll();
  res.status(200).render("job-listings", { jobs });
});

module.exports = JobListingsRoute;
