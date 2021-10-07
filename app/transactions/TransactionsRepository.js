"use strict";
const Repository = require("../Repository");
const { Transaction } = require("../../database/sequelize");

class TransactionsRepository extends Repository {
  constructor() {
    super(Transaction);
  }
}
module.exports = new TransactionsRepository();
