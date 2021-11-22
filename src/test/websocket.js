const dotenv = require("dotenv");
dotenv.config();
const mqtt = require("mqtt");
const timestamp = require("../util/Timestamp")

const { log } = console;

const user = process.env.USERNAME || "admin";
const pass = process.env.PASSWORD || "admin";
const port = process.env.PORT || 80;
const broker_uri = process.env.BROKER_URI

const client = mqtt.connect(broker_uri, {
  username: user,
  password: pass,
});

client.on("connect", () => {
  log("connected!");
  client.subscribe("presence", (err) => {
    if (!err) {
      setInterval(
        () => client.publish("presence", timestamp("Hello World!")),
        3000
      );
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  // client.end();
});
