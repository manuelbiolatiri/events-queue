"use strict";
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 30,
      min: 0,
      acquire: 1000000,
      idle: 10000,
    },
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    },
    operatorsAliases: false,
    timezone: "+01:00", //for writing to database,
  }
);

const Transaction = require("../app/transactions/TransactionsModel")(
  sequelize,
  Sequelize
);

module.exports = {
  sequelize,
  Transaction,
};
