const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://34.207.125.20/';

var db;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log(`Error connecting to DB, ${err}`)
    throw err;
  }
  db = client.db('airbnb');
});

const getRecs = (id, callback) => {
  console.log(`Connected to airbnb database`)
  db.collection('recommendations').find({RoomId: +id}).toArray((err, results) => {
    if (err) throw err;
    callback(null, JSON.stringify(results));
  });
}

module.exports = getRecs;