"use strict";
const _axios = require("axios").create({
  baseURL: process.env.CRYPTO_SERVICE_URL,
  headers: {
    source: process.env.SOURCE || "internal-services",
  },
});

const queryCryptoApi = (transactionCommand) => {
  try {
    // commented because this request doesnt exist
    // const query = await _axios.post("/findwhatever", transactionCommand);

    return { data: transactionCommand };
  } catch (e) {}
  console.log(e);
  return {
    error: e.message || e,
  };
};

const dummyCryptoServiceLogs = [
  {
    clientId: "user1",
    walletAddress: [
      {
        btc: "qwertytrewq",
        eth: "03ytrwer30",
      },
    ],
    externalTransactionId: "1",
    serviceName: "client-service",
    amount: 1.55,
  },
  {
    clientId: "user2",
    walletAddress: [
      {
        btc: "knknnkkqwerq",
        eth: "03aaaaaaaaaa",
      },
    ],
    externalTransactionId: "2",
    serviceName: "client-service",
    amount: 5.01,
  },
];

module.exports = { queryCryptoApi };
