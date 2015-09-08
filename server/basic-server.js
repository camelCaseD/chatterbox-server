/* Import node's http module: */
// var http = require("http");
var express = require('express');
var app = express();
// Import our request-handler
var router = require('./router').requestHandler(express);


var port = process.env.PORT || 3000;

// we'll have it listen on the IP address 127.0.0.1, which is a

var ip = "127.0.0.1";

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
