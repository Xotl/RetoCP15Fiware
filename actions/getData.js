var request = require('request');
var FIWARE_BASE_URL = process.env.FIWARE_BASE_URL || "http://orion.lab.fi-ware.org:1026/";
var FIWARE_AUTH_TOKEN = process.env.FIWARE_AUTH_TOKEN || '851vrEfHL3fb9wAH5FprWqYuQRrxej';
var queueLiters = [], queueUserData = [];
var headers = {
  'Accept': 'application/json',
  'Content-type': 'application/json',
  'X-Auth-Token': FIWARE_AUTH_TOKEN
};

var orion = {
  getOrionData: function(cb) {
    var options = {
      url: FIWARE_BASE_URL + 'ngsi10/contextEntities/cp:guadalajara:2015',
      method: 'GET',
      headers: headers
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        cb(error, body);
      }
    });
  }
};

exports.getData = {
  name: 'getData',
  description: 'I am an API method which will generate a random number',
  inputs: {
  },
  outputExample: {

        "fiware_response": {
            "contextElement": {
                "type": "",
                "isPattern": "false",
                "id": "cp:guadalajara:2015",
                "attributes": [
                    {
                        "name": "alcantarilla1",
                        "type": "float",
                        "value": "100.3"
                    },
                    {
                        "name": "lat",
                        "type": "string",
                        "value": "100.3, 12.23"
                    },
                    {
                        "name": "liters",
                        "type": "string",
                        "value": "100.3, 123"
                    },
                    {
                        "name": "long",
                        "type": "string",
                        "value": "100.3, 12.23"
                    },
                    {
                        "name": "price",
                        "type": "string",
                        "value": "100.3, 12.23"
                    }
                ]
            },
            "statusCode": {
                "code": "200",
                "reasonPhrase": "OK"
            }
        },
        "result": {
            "alcantarilla1": "100.3",
            "lat": "100.3, 12.23",
            "liters": "100.3, 123",
            "long": "100.3, 12.23",
            "price": "100.3, 12.23"
        },
        "serverInformation": {
            "serverName": "actionhero API",
            "apiVersion": "0.0.1",
            "requestDuration": 239,
            "currentTime": 1437890989101
        },
        "requesterInformation": {
            "id": "0dbd6073d6bd8684ba04dc11a0678deaa2d01372-7752908b-33f0-49f6-af63-f27b06c07859",
            "fingerprint": "0dbd6073d6bd8684ba04dc11a0678deaa2d01372",
            "remoteIP": "127.0.0.1",
            "receivedParams": {
                "action": "getData",
                "apiVersion": 1
            }
        }
    
  },

  run: function(api, data, next) {

    orion.getOrionData(function(err, res) {
      res = JSON.parse(res);
      data.response.fiware_response = res
      data.response.result = {};
      res.contextElement.attributes.forEach(function(entry) {
        data.response.result[entry.name] = entry.value;
      });

      next(err);
    });
  }

};
