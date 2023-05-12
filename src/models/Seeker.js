const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Seeker = sequelize.define(
  "seekers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  { tableName: "seekers", timestamps: false }
);

module.exports = Seeker;
