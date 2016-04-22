var express = require('express');
var bodyParser = require('body-parser');
var initializeDB = require('.db/connection.js');

var app = express();
var port = process.env.PORT || 3000;

var index = require('.routes/index-routes.js');


app.use(express.static('server/public'));
app.use('/', index);

initializeDB();

app.list(port, function(){
  console.log('listening on port', port);
});
