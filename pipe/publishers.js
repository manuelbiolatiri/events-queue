const { PRODUCER_QUEUE, CONSUMER_QUEUE } = require("../app/Constants");
const amqplib = require("amqplib");

// channels
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";

// create connection with rabbitmq
const transactionReceived = async (data) => {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(PRODUCER_QUEUE.TRANSACTION_RECEIVED);

    const msg = JSON.stringify(data);

    await channel.sendToQueue(
      PRODUCER_QUEUE.TRANSACTION_RECEIVED,
      Buffer.from(msg, "utf8")
    );
    await channel.close();
    return;
  } catch (ex) {
    console.error(ex);
  }
};

const testUpdateTransactions = async (data) => {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(CONSUMER_QUEUE.UPDATE_TRANSACTION);

    const msg = JSON.stringify(data);

    await channel.sendToQueue(
      CONSUMER_QUEUE.UPDATE_TRANSACTION,
      Buffer.from(msg, "utf8")
    );
    await channel.close();
    return;
  } catch (ex) {
    console.error(ex);
  }
};

module.exports = { testUpdateTransactions, transactionReceived };
