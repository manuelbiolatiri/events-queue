const { CONSUMER_QUEUE } = require("../app/Constants");
const {
  createTransaction,
} = require("../app/transactions/TransactionsController");

// rabbitmq channels
let channel;

// create connection with rabbitmq
module.exports = async function consume(conn) {
  try {
    const connection = await conn;
    channel = await connection.createChannel();
    await channel.assertQueue(CONSUMER_QUEUE.UPDATE_TRANSACTION, {
      durable: true,
    });
    await createTransaction(channel);
    return;
  } catch (ex) {
    console.error(ex, "error consuming");
  }
};
