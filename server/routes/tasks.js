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
  console.log('Task added :' + request.body.task_content);
  pg.connect(Connect, function(err, client, done){
    if (err){
      console.log('Error posting: ' + err);
      response.sendStatus(500);
    } else {
      var result = [];
      var task_content = request.body.task_content;
      var task_status = request.body.task_status;
      var due_date = request.body.due_date;


      var query = client.query('INSERT INTO tasks (task_content, task_status, due_date) VALUES ($1, $2, $3)' + 'RETURNING id, task_content, task_status, due_date', [task_content, task_status, due_date]);

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
router.put('/:todo_id', function(request, response) {
    var results = [];

    // Grab data from the URL parameters
    var id = request.params.todo_id;

    // Grab data from http request
    // var data = {task_content: request.body.task_content, task_status: request.body.task_status};

    console.log('Requested with a body of', request.body);
    var data = request.body;

    // Get a Postgres client from the connection pool
    pg.connect(Connect, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return response.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE tasks SET task_content=($1), task_status=($2) WHERE id=($3)", [data.task_content, data.task_status, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM tasks ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return response.json(results);
        });
    });

});

// router.put('/:id', function(request, response){
//   console.log('Updating task: ' + request.body.id);
//   pg.connect(Connect, function(err, client, done){
//     if (err){
//       console.log('Error updating: ' + err);
//       response.sendStatus(500);
//     } else {
//       var result = [];
//       var query = client.query('UPDATE tasks SET task_status = true WHERE id = ' + request.params.id + ';');
//
//       query.on('row', function(row){
//         result.push(row);
//       });
//
//       query.on('end', function(){
//         done();
//         response.sendStatus(200);
//         return results.json(results);
//       });
//     }
//   });
// });

// ::::::::: DELETE ROW ::::::::: //
router.post('/remove', function(request, response){
  console.log('Deleting task: ' + request.body.id);
  pg.connect(Connect, function(err, client, done){
    if (err){
      console.log('Error posting: ' + err);
      response.sendStatus(500);
    } else {
      var query = client.query('DELETE FROM tasks WHERE (id = ' + request.body.id + ');');

      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function(){
        done();
        response.sendStatus(200);
      });
    }
  });
});


module.exports = router;
