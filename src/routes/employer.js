const express = require("express");
const EmployerRoute = express.Router();
const Employer = require("../models/Employer");
const Job = require("../models/Job");
EmployerRoute.get("/:id", async (req, res) => {
  const employer = await Employer.findByPk(req.params.id);
  const jobs = await Job.findAll({ where: { employer_id: employer.id } });
  res.status(200).render("employer", { employer, jobs });
});

// Edit employer's account
EmployerRoute.patch("/:id", async (req, res) => {
  const employer = await Employer.findByPk(req.params.id);
  employer.name = req.body.name;
  employer.email = req.body.email;
  employer.password = req.body.password;
  employer
    .save()
    .then(() => res.status(200).redirect(`/employers/${employer.id}`))
    .catch((err) => res.status(500).json(err.message));
});

// Delete employer's account
EmployerRoute.delete("/:id", async (req, res) => {
  const employer = await Employer.findByPk(req.params.id);
  employer
    .destroy()
    .then(() => res.status(200).redirect("/"))
    .catch((err) => res.status(500).json(err.message));
});

// Edit employer's info
EmployerRoute.post("/edit/:id", (req, res) => {
  Employer.update(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { where: { id: req.params.id } }
  )
    .then(() => res.status(200).redirect(`/employer/${req.params.id}`))
    .catch((err) => res.status(500).json(err.message));
});

module.exports = EmployerRoute;
