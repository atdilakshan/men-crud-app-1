const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();

const db             = require('./config/db');

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, (err, db) => {
  if (err) return console.log(err)
                      
  // Make sure you add the database name and not the collection name
  const database = db.db("note-api")
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})