const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Employer = sequelize.define(
  "employers",
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
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  { tableName: "employers", timestamps: false }
);

module.exports = Employer;
