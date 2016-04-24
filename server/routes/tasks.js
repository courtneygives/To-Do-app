var router = require('express').Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');


var Connect = require('../db/connection.js').Connect;

// ::::::::: GET ALL ROWS ::::::::: //
router.get('/', function(request, response){
  pg.connect(Connect, function(err, client, done){
    if (err){
      console.log('Error getting all rows: ' + err);
      response.sendStatus(500);
    } else {
      var query = client.query('SELECT * FROM tasks');
      var results = [];
      query.on('error', function(err){
        console.log('Query error: ' + err);
        done();
        response.sendStatus(500);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      });
      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});


// ::::::::: ADD NEW ROW ::::::::: //

router.post('/', function(request, response){
  console.log(request.body);
  pg.connect(Connect, function(err, client, done){
    if (err){
      console.log('Error posting: ' + err);
      response.sendStatus(500);
    } else {
      var result = [];
      var task_text = request.body;

      var query = client.query('INSERT INTO tasks (task_text) VALUES ($1) ' + 'RETURNING id, task_text', [task_text]);

      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function(){
        done();
        response.send(result);
      });
    }
  });
});

// ::::::::: MODIFY ROW ::::::::: //



// ::::::::: DELETE ROW ::::::::: //



module.exports = router;
