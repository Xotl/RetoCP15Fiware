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

    "serverInformation": {
      "serverName": "actionhero API",
      "apiVersion": "0.0.1",
      "requestDuration": 2,
      "currentTime": 1437872679509
    },
    "requesterInformation": {
      "id": "c4311e095dbc0b8fb4dd23d6d7a9ceb378270e97-ce117798-fbb6-4af6-be46-1c296665709c",
      "fingerprint": "c4311e095dbc0b8fb4dd23d6d7a9ceb378270e97",
      "remoteIP": "200.52.194.71",
      "receivedParams": {
        "apiVersion": "1",
        "action": "getData"
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

      next(err)
    });
  }

};
