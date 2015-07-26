var request = require('request');
var FIWARE_BASE_URL = process.env.FIWARE_BASE_URL || "http://orion.lab.fi-ware.org:1026/";
var FIWARE_AUTH_TOKEN = process.env.FIWARE_AUTH_TOKEN || '851vrEfHL3fb9wAH5FprWqYuQRrxej';
var queueLiters = [], queueUserData = [];
var headers = {
  'Accept': 'application/json',
  'Content-type': 'application/json',
  'X-Auth-Token': FIWARE_AUTH_TOKEN
};

exports.default = {
  "my-plugin": function(api) {

    return {
      fromPostLiters: function(state, lts) {
        if (state !== 'good') return;

        queueLiters.push(lts);
        this.updateOrion();
      },
      fromPostUser: function(state, data) {
        if (state !== 'good') return;

        queueUserData.push(data);
        this.updateOrion();
      },
      getOrionData: function(state, cb) {
        console.log("si entra");

        if (state !== 'good') return;

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
      updateOrion: function(state) {
        if (state !== 'good') return;

        if (queueLiters.length > 0 && queueUserData.length > 0) {
          return;
        }


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
            "updateAction": "UPDATE"
          }
        };

      }
    };
  }
};
