var request = require('request');
var queueLiters = [];
var queueUserData = [];
var FIWARE_BASE_URL = process.env.FIWARE_BASE_URL || "http://orion.lab.fi-ware.org:1026/";
var FIWARE_AUTH_TOKEN = process.env.FIWARE_AUTH_TOKEN || '851vrEfHL3fb9wAH5FprWqYuQRrxej';


exports.task = {
  name:          'updateOrion',
  description:   'None',
  queue:         'default',
  frequency:     0,
  plugins:       [],
  pluginOptions: {},

  run: function(api, params, next){



    var options = {
      url: FIWARE_BASE_URL,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'X-Auth-Token': FIWARE_AUTH_TOKEN
      }
    };

    console.log('Task is running!');
    request(options, function (error, response, body) {

      console.log('Request has finished!');


      if (!error && response.statusCode == 200) {
        api.log("Success");
        api.log(body); // Show the HTML for the Google homepage.
      }

      next(error);
    });

  }
};
