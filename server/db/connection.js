var pg = require('pg');

var Connect;

if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  Connect = process.env.DATABASE_URL;
} else {
  Connect = 'postgres://localhost:5432/task2';
}
function initializeDB(){
  pg.connect(Connect, function(err, client, done){
    if (err){
      console.log('Error connecting to Task 2 database: ', err);
      process.exit(1);
    } else {
      var query = client.query(
        'CREATE TABLE IF NOT EXISTS tasks(' +
        'id SERIAL PRIMARY KEY,' +
        'task_text varchar(255) NOT NULL);');

        query.on('end', function(){
          console.log('Task table has been created');
          done();
        });
        query.on('error', function(err){
          console.log('Error creating tasks table: ' + err);
          process.exit(1);
        });
    }
  });
}

module.exports.Connect = Connect;
module.exports.initializeDB = initializeDB;
