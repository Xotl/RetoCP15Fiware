exports.postUserData = {
  name: 'postUserData',
  description: 'Send the price and geocode from the user.',
  inputs: {
    price: {
      required: true
    },
    lat: {
      required: true
    },
    long: {
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

    var obj = {
      lat: data.params.lat,
      long: data.params.long,
      price: data.params.price
    }

    api.config['my-plugin'].fromPostUser(obj);
    data.response.status = "OK";
    next(null);
  }

};
