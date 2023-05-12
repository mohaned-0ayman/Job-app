const express = require("express");
const APIRouter = express.Router();
const employersAPIRouter = require("./employers");
const seekersAPIRouter = require("./seekers");
const jobAppsAPIRouter = require("./jobApplications");
const jobsAPIRouter = require("./jobs");

APIRouter.use("/employers", employersAPIRouter);
APIRouter.use("/seeker", seekersAPIRouter);
// APIRouter.use("/job-apps", jobAppsAPIRouter);
APIRouter.use("/jobs", jobsAPIRouter);

APIRouter.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    error: 0,
    Usage:
      "Use /employers, /job-apps, or /jobs to get the date you want from our API.",
  });
});

module.exports = APIRouter;
