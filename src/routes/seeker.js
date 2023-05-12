const express = require("express");
const { Op } = require("sequelize");
const SeekerRoute = express.Router();
const Seeker = require("../models/Seeker");
const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");

SeekerRoute.get("/:id", async (req, res) => {
  const seeker = await Seeker.findByPk(req.params.id);
  const jobs = await Job.findAll();
  const applications = await JobApplication.findAll({
    where: { applicant_id: seeker.id },
  });
  let appliedJobsArr = [];
  applications.forEach((app) => {
    appliedJobsArr.push(app.job_id);
  });
  const appliedJobs = await Job.findAll({
    where: { id: { [Op.in]: appliedJobsArr } },
  });
  res.status(200).render("seeker", {
    seeker,
    jobs,
    appliedJobs,
  });
});

SeekerRoute.post("/edit/:id", async (req, res) => {
  const seeker = await Seeker.findByPk(req.params.id);
  const { name, email, password, location } = req.body;
  await Seeker.update(
    {
      name,
      email,
      password,
      location,
    },
    { where: { id: seeker.id } }
  );
  res.status(200).redirect(`/seeker/${seeker.id}`);
});

SeekerRoute.patch("/");

SeekerRoute.delete("/");

module.exports = SeekerRoute;
