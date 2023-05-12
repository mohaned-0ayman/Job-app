const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("job_board", "root", "", {
  dialect: "mysql",
  port: 3306,
  host: "localhost",
  logging: false,
});

module.exports = sequelize;
