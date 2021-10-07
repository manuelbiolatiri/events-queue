const http = require("http");

const App = require("./app");
const amqplib = require("amqplib");
const consume = require("./pipe/consumers");

const port = normalizePort(process.env.PORT || 3000);
App.set("port", port);

const server = http.createServer(App);
server.listen(port);

server.on("error", onError);
server.on("listening", onListening);

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";

// singular connection point
const amqpconnection = amqplib.connect(RABBITMQ_URL);
console.log("Queue connected");

// consumers
consume(amqpconnection);

function normalizePort(val) {
  const port = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error) {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  console.log(`Server started:Listening on ${bind}`);
}

module.exports = { server, amqpconnection };
