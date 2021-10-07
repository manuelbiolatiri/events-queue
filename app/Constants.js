"use strict";

module.exports = {
  PRODUCER_QUEUE: {
    TRANSACTION_RECEIVED: "TransactionReceived",
  },

  CONSUMER_QUEUE: {
    UPDATE_TRANSACTION: "UpdateTransations",
  },
  TRANSACTION_COMMAND_pAYLOAD: {
    clientId: "user1",
    walletAddress: "qwertytrewq",
    currencyType: "btc",
    externalTransactionId: "1",
    serviceName: "client-service",
    amount: 1.55,
  },
};
