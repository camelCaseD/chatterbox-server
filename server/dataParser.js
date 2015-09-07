var queryString = require('querystring');
var data = '';


module.exports = function (request, cb) {
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    console.log(data);
    data = JSON.parse(data);
    cb(data);
  });
}