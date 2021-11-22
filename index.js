// const aedes = require("aedes")();
// const httpServer = require("http").createServer();
// import { createServer } from "websocket-stream";
// const port = process.env.PORT || 80;

// createServer({ server: httpServer }, aedes.handle);

// httpServer.listen(port, () => {
//   console.log("websocket server listening on port ", port);
// });

const Broker = require("./src/broker/index")
Broker.start()
