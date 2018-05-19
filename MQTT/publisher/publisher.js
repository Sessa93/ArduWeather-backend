var mqtt = require('mqtt');
var client  = mqtt.connect('178.62.4.105:1883');

client.on('connect', function () {
    setInterval(function() {
        client.publish('myTopic', 'Hello mqtt');
        console.log('Message Sent');
    }, 5000);
});
