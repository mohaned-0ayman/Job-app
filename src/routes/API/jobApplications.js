// const express = require("express");
// <<<<<<< HEAD
// <<<<<<< HEAD
// const Employers = require("../../models/Employer");
// const employersAPIRouter = express.Router();
// =======
// const jobAppsAPIRouter = express.Router();
// const JobApps = require("../../models/jobApplications");
// >>>>>>> origin/mohamed
// =======
// const Employers = require("../../models/Employer");
// const employersAPIRouter = express.Router();
// >>>>>>> 21e266de93f6f4e1f8b41aa1262d302f1e76bd7f
//
// employersAPIRouter.get("/", (req, res) => {
//   Employers.findAll()
//     .then((data) => res.status(200).json(data))
//     .catch((err) => res.status(500).json(err.message));
// });
//
// employersAPIRouter.post("/", (req, res) => {
//   Employers.create({ ...req.body })
//     .then((data) => res.status(200).json(data))
//     .catch((err) => res.status(500).json(err.message));
// });
//
// employersAPIRouter.patch("/:id", (req, res) => {
//   Employers.update({ ...req.body }, { where: { id: req.params.id } })
//     .then((data) => res.status(200).json(data))
//     .catch((err) => res.status(500).json(err));
// });
//
// <<<<<<< HEAD
// <<<<<<< HEAD
// =======
// >>>>>>> 21e266de93f6f4e1f8b41aa1262d302f1e76bd7f
// employersAPIRouter.delete("/:id", (req, res) => {
//   Employers.destroy({ where: { id: req.params.id } })
//     .then((data) => res.status(200).json(data))
//     .catch((err) => res.status(500).json(err));
// });
//
// module.exports = employersAPIRouter;
// <<<<<<< HEAD
// =======
// module.exports = jobAppsAPIRouter;
// >>>>>>> origin/mohamed
// =======
// >>>>>>> 21e266de93f6f4e1f8b41aa1262d302f1e76bd7f
