const express = require("express");
const Jobs = require("../../models/Job");
const jobsAPIRouter = express.Router();

jobsAPIRouter.get("/", (req, res) => {
  Jobs.findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err.message));
});

jobsAPIRouter.post("/", (req, res) => {
  Jobs.create({ ...req.body })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err.message));
});

jobsAPIRouter.patch("/:id", (req, res) => {
  Jobs.update({ ...req.body }, { where: { id: req.params.id } })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

jobsAPIRouter.delete("/:id", (req, res) => {
  Jobs.destroy({ where: { id: req.params.id } })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

module.exports = jobsAPIRouter;
