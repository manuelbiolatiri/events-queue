"use strict";

module.exports = (sequelize, type) => {
  return sequelize.define(
    "transactions",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      externalTransactionId: type.STRING,
      serviceName: type.STRING,
      amount: type.INTEGER,
      walletAddress: type.STRING,
      clientId: type.STRING,
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["externalTransactionId", "walletAddress", "clientId"],
        },
      ],
    }
  );
};
