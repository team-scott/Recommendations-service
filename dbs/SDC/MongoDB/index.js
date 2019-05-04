const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://52.91.16.180/';

var db;

const connect = () => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log(`Error connecting to DB, ${err}`)
    throw err;
  }
  db = client.db('airbnb');
  });
}

const getRecs = (id, callback) => {
  console.log(`Connected to airbnb database`)
  db.collection('recommendations').find({RoomId: +id}).toArray((err, results) => {
    if (err) throw err;
    callback(null, JSON.stringify(results));
  });
}

module.exports.getRecs = getRecs;
module.exports.connect = connect;