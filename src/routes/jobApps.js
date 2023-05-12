const express = require("express");
const JobAppsRoute = express.Router();
const JobApplication = require("../models/JobApplication");
const Job = require("../models/Job");
const Seeker = require("../models/Seeker");

JobAppsRoute.post("/add/:seekerID/:jobID", async (req, res) => {
  const { seekerID, jobID } = req.params;
  JobApplication.create({
    job_id: jobID,
    applicant_id: seekerID,
  })
    .then(() => res.status(200).redirect(`/seeker/${seekerID}`))
    .catch((err) => res.status(500).json(err.message));
});

JobAppsRoute.post("/");

JobAppsRoute.patch("/");

JobAppsRoute.post("/delete/:seekerID/:jobID", async (req, res) => {
  const { seekerID, jobID } = req.params;
  JobApplication.destroy({
    where: {
      job_id: jobID,
      applicant_id: seekerID,
    },
  })
    .then(() => res.status(200).redirect(`/seeker/${seekerID}`))
    .catch((err) => res.status(500).json(err.message));
});

module.exports = JobAppsRoute;
