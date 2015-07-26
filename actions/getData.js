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
    api.config['my-plugin'].getOrionData('good', function(err, data) {
      data.response.status = 'OK';
      data.response.fiware_response = data;
      next(err);
    });
  }

};
