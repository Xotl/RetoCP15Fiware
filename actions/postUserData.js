var request = require('request');
var FIWARE_BASE_URL = process.env.FIWARE_BASE_URL || "http://orion.lab.fi-ware.org:1026/";
var FIWARE_AUTH_TOKEN = process.env.FIWARE_AUTH_TOKEN;
var queueLiters = [], queueUserData = [];
var headers = {
  'Accept': 'application/json',
  'Content-type': 'application/json',
  'X-Auth-Token': FIWARE_AUTH_TOKEN
};

var orion = {
  fromPostLiters: function(lts) {
    queueLiters.push(lts);
    this.updateOrion();
  },
  fromPostUser: function(data) {
    queueUserData.push(data);
    this.updateOrion();
  },
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
  },
  updateOrion: function(cb) {
    if (queueLiters.length === 0 || queueUserData.length === 0) {
      return;
    }


    this.getOrionData(function(err, res) {
      res = JSON.parse(res).contextElement;
      var obj = {};
      res.attributes.forEach(function(entry) {
        obj[entry.name] = entry.value;
      });

      var temp = queueUserData.shift();
      console.log("asdsaddpppppppppppppppppp",temp);
      var options = {
        url: FIWARE_BASE_URL + "ngsi10/updateContext/",
        method: 'POST',
        headers: headers,
        json: true,
        body: {
          "contextElements": [
              {
                  "type": "",
                  "isPattern": "false",
                  "id": "cp:guadalajara:2015",
                  "attributes": [
                    {
                        "name": "lat",
                        "type": "string",
                        "value": obj.lat + ', ' + temp.lat
                    },
                    {
                        "name": "long",
                        "type": "string",
                        "value": obj.long + ', ' + temp.long
                    },
                    {
                        "name": "price",
                        "type": "string",
                        "value": obj.price + ', ' + temp.price
                    },
                    {
                        "name": "liters",
                        "type": "string",
                        "value": obj.liters + ', ' + queueLiters.shift()
                    }
                  ]
              }
          ],
          "updateAction": "UPDATE"
        }
      };

      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          if (cb) {
            cb(error, body);
          }
        }
      });

    });
  }

};


exports.postUserData = {
  name: 'postUserData',
  description: 'Send the price and geocode from the user.',
  inputs: {
    price: {
      required: false
    },
    lat: {
      required: false
    },
    long: {
      required: false
    },
    liters: {
      required: false
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

    if (data.params.admin) {
      if (data.params.debug) {
        console.log({
          queueLiters: queueLiters,
          queueUserData: queueUserData
        });
      }

      if (data.params.flush) {
        queueLiters = [];
        queueUserData = [];
      }
      return;
    }

    if (data.params.liters) {
      orion.fromPostLiters(data.params.liters);
      data.response.status = "OK";
      next(null);
    }
    else {

      var obj = {
        lat: data.params.lat,
        long: data.params.long,
        price: data.params.price
      }

      orion.fromPostUser(obj);
      data.response.status = "OK";
      next(null);
    }
  }

};
