const dotenv = require("dotenv");
dotenv.config();
const mqtt = require("mqtt");

const { log } = console;

const user = process.env.USERNAME || "admin";
const pass = process.env.PASSWORD || "admin";
const port = process.env.PORT || 80;

const client = mqtt.connect(`ws://distributed-broker.herokuapp.com`, {
  username: user,
  password: pass,
});

client.on("connect", () => {
  log("connect")
  client.subscribe("presence", (err) => {
    log(err)
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});


client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
