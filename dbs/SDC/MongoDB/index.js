const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://52.91.16.180/';

var db;

MongoClient.connect(url, {  poolSize: 10, useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log(`Error connecting to DB, ${err}`)
    throw err;
  }
  console.log(`Connected to airbnb database`)
  db = client.db('airbnb');
});

const getRecs = (id, callback) => {
  db.collection('recommendations').find({RoomId: +id}).toArray((err, results) => {
    if (err) throw err;
    callback(null, JSON.stringify(results));
  });
}

module.exports = getRecs;