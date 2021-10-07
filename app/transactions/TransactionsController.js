"use strict";

const transactionsRepository = require("./TransactionsRepository");
const { CONSUMER_QUEUE, TRANSACTION_COMMAND_pAYLOAD } = require("../Constants");
const { v4: uuidv4 } = require("uuid");
const {
  transactionReceived,
  testUpdateTransactions,
} = require("../../pipe/publishers");
const cryptoService = require("../../services/cryptoService");
const { successResponse, errorResponse } = require("../../helpers/response");

// create a transaction
const createTransaction = async (channel) => {
  channel.consume(
    CONSUMER_QUEUE.UPDATE_TRANSACTION,
    async (msg) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        console.log("consume queue message", message);

        // TODO:: create a message history log

        let payload = {
          ...message,
          externalTransactionId: await uuidv4(),
        };

        const queryCrypto = await cryptoService.queryCryptoApi(payload);

        if (queryCrypto) {
          // const generateUniqueReference = await uuid.v4();
          const createTransaction = await transactionsRepository.create(
            payload
          );
          if (createTransaction) {
            // publish transaction received
            await transactionReceived(createTransaction);
          }
        }

        return channel.ack(msg);
      }
    },
    {
      noAck: false,
    }
  );
};

const getTransactions = async (req, res) => {
  try {
    let filter = {};
    const result = await transactionsRepository.paginate(
      filter,
      Number(req.query.page),
      Number(req.query.limit)
    );
    return successResponse(res, result);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Oops something went wrong");
  }
};

const getTransactionById = async (req, res) => {
  const result = await transactionsRepository.findOne({ id: req.body.id });
  return successResponse(res, result);
};

const getTransactionByAny = async (req, res) => {
  const result = await transactionsRepository.findOne(req.body);
  return successResponse(res, result);
};

const testQueueCommunication = async (req, res) => {
  await testUpdateTransactions(req.body);

  return successResponse(res, "Your request has been published");
};

module.exports = {
  createTransaction,
  getTransactions,
  transactionReceived,
  getTransactionByAny,
  getTransactionById,
  testQueueCommunication,
};
