const net = require("net");
const aedes = require("aedes")
const mqemitter = require('mqemitter')
const port = process.env.PORT || "1883";

const start = () => {
  const aedes = require('aedes')({
    id: "the_broker",
    mq: mqemitter(),
    username: "admin",
    password: "admin",
  })
  const server = require('net').createServer(aedes.handle)

  server.listen(port, function () {
    console.log('Broker listening on port:', port)
  })


  aedes.on('client', (client) => {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
  })

};

const Broker = {
  start: start
};

module.exports = Broker;