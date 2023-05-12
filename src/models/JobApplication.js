const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Job = require("./Job");
const Seeker = require("./Seeker");

const JobApplication = sequelize.define(
  "job_apps",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    applicant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "job_apps", timestamps: true }
);
JobApplication.belongsTo(Job, { foreignKey: "job_id" });
JobApplication.belongsTo(Seeker, { foreignKey: "applicant_id" });

module.exports = JobApplication;
