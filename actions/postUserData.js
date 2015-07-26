var request = require('request');
var FIWARE_BASE_URL = process.env.FIWARE_BASE_URL || "http://orion.lab.fi-ware.org:1026/";
var FIWARE_AUTH_TOKEN = process.env.FIWARE_AUTH_TOKEN;

exports.postUserData = {
  name: 'postUserData',
  description: 'I am an API method which will generate a random number',
  inputs: {
    price: {
      required: true
    },
    lat: {
      required: true
    },
    long: {
      required: true
    },
    alt: {
      required: true
    }
  },
  outputExample: {
    "status": "OK",
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
        "action": "postUserData"
      }
    }
  },

  run: function(api, data, next) {

    var options = {
      url: FIWARE_BASE_URL + "ngsi10/updateContext/",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'X-Auth-Token': FIWARE_AUTH_TOKEN
      },
      json: true,
      body: {
        "contextElements": [
            {
                "type": "prueba",
                "isPattern": "false",
                "id": "cp:guadalajara:2015",
                "attributes": [
                  {
                      "name": "lat",
                      "type": "float",
                      "value": data.params.lat
                  },
                  {
                      "name": "long",
                      "type": "float",
                      "value": data.params.long
                  },
                  {
                      "name": "price",
                      "type": "float",
                      "value": data.params.price
                  }
                ]
            }
        ],
        "updateAction": "APPEND"
      }
    };


    console.log(options.body.contextElements[0].attributes);
    request(options, function (error, response, body) {
      console.log('Request has finished!', error);

      if (!error && response.statusCode == 200) {
        data.response.fiware_response = body;
        data.response.status = 'OK';

        console.log(body); // Show the HTML for the Google homepage.
      }

      next(error);
    });
  }

};
