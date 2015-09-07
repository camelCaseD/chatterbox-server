var simpleId = require('simple-unique-id');
var messages = {results:[]};

module.exports.add = function(message, cb) {
  message.objectId = simpleId.generate(message.text);
  message.createdAt = new Date();
  messages.results.push(message);
  cb(message);  
}

module.exports.fetch = function() {
  return messages;
}
