const dotenv = require("dotenv");
dotenv.config();
const aedes = require("aedes");
const print = require("../util/Logging");
const { log } = console;

const port = process.env.PORT || "1883";
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
  const server = require("net").createServer(broker.handle);

  server.listen(port, () => {
    log("Broker listening on port:", port);
  });

  broker.on("client", (client) => {
    log(`Client Connected: ${client ? client.id : client} to broker ${broker.id}`);
  });
};

module.exports = {
  start: start,
};
