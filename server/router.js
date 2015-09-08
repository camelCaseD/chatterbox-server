
var url = require('url');
var messages = require('./messages');
var dataParser = require('scalpel');
var express = require('express')

var requestHandler = function() {
  var router = express.Router();

  var headers = defaultCorsHeaders;

  //redirect to our index page
  router.get('/', function(req, res){
    res.redirect('/refactor.html');
  });

  
  router.get('/classes/messages', function(req, res) {
    res.status(200);
    res.send( JSON.stringify(messages.fetch()) );
  });
  router.post('/classes/messages', function(req, res) {
    res.status(201);
    dataParser(req, res, function(){
      messages.add(req.parsedBody, function(message){
        res.send( JSON.stringify(message) );
      });
    });
  });
 
  var getRoomCB = function(req, res) {
    res.status(200);
    res.send( JSON.stringify(messages.fetch()) );
  };
  router.getRooms = getRoomCB;

  var postRoomCB = function(req, res) {
    res.status(201);
    dataParser(req, res, function(){
      messages.add(req.parsedBody, function(message){
        res.end( JSON.stringify(message) );
      });
    });
  };
  router.postRooms = postRoomCB;

  //get and post requests for other rooms but only within /classes/
  router.get('/classes/:room', getRoomCB);
  router.post('/classes/:room', postRoomCB);

  return router
};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
module.exports.requestHandler = requestHandler;
