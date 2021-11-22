const dotenv = require("dotenv");
dotenv.config();
const server = require("http").createServer();
const ws = require("websocket-stream");

const authenticate = (client, username, password, callback) => {
  if (username === user && password.toString() === pass) {
    callback(null, true);
  } else {
    const error = new Error("Authentication error");
    error.returnCode = 5;
    callback(error, false);
  }
};
const aedes = require("aedes")({
  authenticate: authenticate,
});

ws.createServer({ server: server }, aedes.handle);

const port = process.env.PORT || 80;
const user = process.env.USERNAME || "admin";
const pass = process.env.PASSWORD || "admin";

const start = () => {
  // server.listen(port, () => {
  //   console.log("websocket server listening on port ", port);
  // });
  server.listen(port, () => {
    //log("Broker listening on port:", port);
    log("websocket server listening on port ", port);
  });

  broker.on("client", (client) => {
    log(
      `Client Connected: ${client ? client.id : client} to broker ${broker.id}`
    );
  });
};

module.exports = {
  start: start
}
