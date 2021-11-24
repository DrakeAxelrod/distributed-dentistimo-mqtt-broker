const aedes = require("aedes")();
const httpServer = require("http").createServer();
const ws = require("websocket-stream");

ws.createServer({ server: httpServer }, aedes.handle);

const port = process.env.PORT || 80;
const user = process.env.BROKER_USERNAME || "admin";
const pass = process.env.BROKER_PASSWORD || "admin";

const authenticate = (client, username, password, callback) => {
  if (username === user && password.toString() === pass) {
    callback(null, true);
  } else {
    const error = new Error("Authentication error");
    error.returnCode = 5;
    callback(error, false);
  }
};

httpServer.listen(port, () => {
  console.log("websocket server listening on port ", port);
  aedes.authenticate = authenticate
});
