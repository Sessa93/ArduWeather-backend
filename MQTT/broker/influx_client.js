const Influx = require('influx');
const config = require('config');
const influxConfig = config.get('influxdb');

const influx = new Influx.InfluxDB({
  host: influxConfig.host,
  database: influxConfig.database,
  schema: [
    {
      measurement: 'weather_measure',
      tags: ['jerago'],
      fields: {
        temp: Influx.FieldType.FLOAT,
        hum: Influx.FieldType.FLOAT,
        pres: Influx.FieldType.FLOAT
      }
    }
  ]
});

const putMeasures = function(measure) {
    const point = [
        {
            measurement: 'weather_measure',
            fields: {
                temp: measure.temp,
                hum: measure.hum,
                pres: measure.pres
            }
        }
    ];

    influx.writePoints(point).catch(err => {
        console.error('Error writing to InfluxDB', err)
    })
};

const parseMessage = function(message) {
    var measures = {};
    var fields = message.split('&');
    var j = '{';
    for(var i = 0; i < fields.length; i++) {
        var m = fields[i].split('=')
        j += ('"'+mapping(m[0])+'": '+m[1]);
        if (i < fields.length-1) {
            j += ','
        }
    }

    j += '}';
    return JSON.parse(j);
};

const mapping = function(field) {
    switch(field) {
        case 'field1':
            return 'temp';
        case 'field2':
            return 'hum';
        case 'field3':
            return 'pres';
    }
    return '';
};

module.exports.putMeasures = putMeasures;
module.exports.parseMessage = parseMessage;
