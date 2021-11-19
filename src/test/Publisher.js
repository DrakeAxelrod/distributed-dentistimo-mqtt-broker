const mqtt = require("mqtt");

const broker_uri = "mqtt://localhost:1883";

const client = mqtt.connect(broker_uri);

const timestamp = (text) => `[${new Date().toLocaleString()}] ${text}`;

client.on("connect", () => {
	console.log("connected!");
	setInterval(() => client.publish("test", timestamp("Hello World!")), 3000);
});

client.on("error", err => console.log(err));