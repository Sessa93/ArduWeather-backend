var mosca = require('mosca')
var influx = require('./influx_client')

var ascoltatore = {
  type: 'redis',
  redis: require('redis'),
  db: 12,
  port: 6379,
  return_buffers: false, // to handle binary payloads
  host: "localhost"
};

var moscaSettings = {
  host: '0.0.0.0',
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Redis
  }
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
	console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  var msg = packet.payload.toString('utf8');
  console.log('NEW MESSAGE: '+msg);
  if (msg.includes('field1')) {
      influx.putMeasures(influx.parseMessage(msg));
  }
});

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}
