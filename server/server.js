var express = require('express');
var bodyParser = require('body-parser');
var initializeDB = require('./db/connection.js').initializeDB;

var app = express();
var port = process.env.PORT || 3000;

var index = require('./routes/index-routes.js');
var tasks = require('./routes/tasks.js');


app.use(express.static('server/public'));
app.use('/', index);
app.use('/tasks', tasks);

initializeDB();

app.listen(port, function(){
  console.log('listening on port', port);
});
