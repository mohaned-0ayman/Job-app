const express = require("express");
const JobRoute = express.Router();
const Job = require("../models/Job");
const Employer = require("../models/Employer");
const JobApplication = require("../models/JobApplication");

JobRoute.get("/:id", async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  res.status(200).render("job-details", { job });
});

// Add a new job
JobRoute.post("/:id", async (req, res) => {
  const employer = await Employer.findByPk(req.params.id);
  Job.create({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    salary: req.body.salary,
    company: req.body.company,
    level: req.body.level,
    type: req.body.type,
    employer_id: employer.id,
  })
    .then(() => res.status(200).redirect(`/employer/${employer.id}`))
    .catch((err) => res.status(500).json(err.message));
});

// Edit a job
JobRoute.patch("/jobs/:id", async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  job.title = req.body.title;
  job.description = req.body.description;
  job.location = req.body.location;
  job.company = req.body.company;
  job.level = req.body.level;
  job.type = req.body.type;
  job.salary = req.body.salary;
  job
    .save()
    .then(() => res.status(200).redirect(`/employers/${job.employer_id}`))
    .catch((err) => res.status(500).json(err.message));
});

// Delete a job
JobRoute.post("/delete/:id", async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  await JobApplication.destroy({ where: { job_id: req.params.id } });
  Job.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).redirect(`/employer/${job.employer_id}`))
    .catch((err) => res.status(500).json(err.message));
});

module.exports = JobRoute;
