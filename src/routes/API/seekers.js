const express = require("express");
const Seeker = require("../../models/Seeker");
const seekersAPIRouter = express.Router();

seekersAPIRouter.get("/", (req, res) => {});

// TODO: Check if this route is needed
seekersAPIRouter.post("/", (req, res) => {
  Seeker.create({ ...req.body })
    .then(() => res.status(200).redirect("/login"))
    .catch((err) => res.status(500).json(err.message));
});

seekersAPIRouter.patch("/:id", (req, res) => {});

seekersAPIRouter.delete("/:id", (req, res) => {});

module.exports = seekersAPIRouter;
