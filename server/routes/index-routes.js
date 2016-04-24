var router = require('express').Router();
var path = require('path');
var bodyParser = require('body-parser');


// ::::::::: INDEX ::::::::: //

router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});


module.exports = router;
