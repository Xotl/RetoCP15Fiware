exports.postLiters = {
  name: 'postLiters',
  description: 'I am an API method which will generate a random number',
  outputExample: {
    "status": "OK"
  },

  run: function(api, data, next){
    data.response.status = 'OK';
    next(null);
  }

};
