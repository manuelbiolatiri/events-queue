"use strict";
const express = require("express");
const router = express.Router();

const transactionController = require("../app/transactions/TransactionsController");

router.get("/", transactionController.getTransactions);
router.get("/search", transactionController.getTransactionByAny);
router.get("/:id", transactionController.getTransactionById);

router.post(
  "/testQueueCommunication",
  transactionController.testQueueCommunication
);

module.exports = router;
