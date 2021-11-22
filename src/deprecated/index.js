const dotenv = require("dotenv");
dotenv.config();
const aedes = require("aedes");
const ws = require("websocket-stream");
const print = require("../util/print");
const { log } = console;

const port = process.env.PORT || 80;
const user = process.env.USERNAME || "admin";
const pass = process.env.PASSWORD || "admin";

const authenticate = (client, username, password, callback) => {
  if (username === user && password.toString() === pass) {
    callback(null, true);
  } else {
    const error = new Error("Authentication error");
    error.returnCode = 5;
    callback(error, false);
  }
};

const start = () => {
  const broker = aedes({
    authenticate: authenticate,
  });
  const server = require("http").createServer();
  //const server = require("net").createServer(broker.handle);
  ws.createServer({ server: server }, broker.handle);

  server.listen(port, () => {
    //log("Broker listening on port:", port);
    log("websocket server listening on port ", port);
  });

  broker.on("client", (client) => {
    log(`Client Connected: ${client ? client.id : client} to broker ${broker.id}`);
  });
};

module.exports = {
  start: start,
};