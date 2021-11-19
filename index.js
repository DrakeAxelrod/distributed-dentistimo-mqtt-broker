const dotenv = require("dotenv");
const Broker = require("./src/broker")

dotenv.config();
Broker.start()