var simpleId = require('simple-unique-id');
var jsonfile = require('jsonfile');
var moment = require('moment');
// var messages = {results:[]};
var path = __dirname + '/data/messages.json';
var messages;
var getMessages = function () {
  jsonfile.readFile(path, function(err, obj){ 
    messages = obj;
  });
  messages.results.sort(function(a,b){
    return moment(a.createdAt).isAfter(b.createdAt);
  });
  return messages;
};

module.exports.add = function(message, cb) {
  message.objectId = simpleId.generate(message.text);
  message.createdAt = new Date();
  getMessages();
  messages.results.push(message);

  cb(message);
  jsonfile.writeFile(path, messages, {"spaces": 2}, function(err){
    if(err){ console.log('I ate your cookies ' + err); };
  });  
};

module.exports.fetch = function() {
  getMessages();
  return messages;
};
