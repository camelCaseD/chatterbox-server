/* Import node's http module: */
// var http = require("http");
var express = require('express');
var app = express();
// Import our request-handler
var router = require('./router').requestHandler();

// this is for the deployed Heroku version. Locally we use 3000
var port = process.env.PORT || 3000;

var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
 
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(enableCORS);

app.use(router);

app.use(express.static(__dirname + '/../client'));
app.listen(port);
