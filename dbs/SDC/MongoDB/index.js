const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://3.82.236.59/';



const getRecs = (id, callback) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    let db = client.db('airbnb');
    db.collection('recommendations').find({RoomId: +id}).toArray((err, results) => {
      if (err) throw err;
      callback(null, JSON.stringify(results));
    });
  });
}


module.exports = getRecs;