const dotenv = require("dotenv");
dotenv.config();
const mqtt = require("mqtt");
const { log } = console;

const port = process.env.PORT || "1883";
const broker_uri = process.env.BROKER_URI || `mqtt://localhost:${port}`;
const user = process.env.USERNAME || "admin";
const pass = process.env.PASSWORD || "admin";
const _topic = process.env.PASSWORD || "test";

const client = mqtt.connect(broker_uri, {
  username: user,
  password: pass,
});

client.on("connect", (ack) => {
  log("connected!");
  //log(ack);
  client.subscribe(_topic, (err) => {
    log(err);
  });

  client.on("message", (topic, message) => {
    log(topic);
    // message is Buffer
    log(message.toString());
  });
});

client.on("error", (err) => {
  log(err);
});
