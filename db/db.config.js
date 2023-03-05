//import sequelize
const { Sequelize } = require("sequelize");

//for env variables
require("dotenv").config();

//instancitaion
exports.sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);
