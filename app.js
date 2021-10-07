"use strict";
require("dotenv").config({});
const createError = require("http-errors");
const express = require("express");
const http = require("http");
const cors = require("cors");
const errorHandler = require("./helpers/ErrorHandler");
const { sequelize } = require("./database/sequelize");

const transactionsRouter = require("./routes/transactions");

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// require("./routes/router")(app); routes
app.use("/transactions", transactionsRouter);

const server = http.createServer(app);

app.server = server;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);
module.exports = app;
