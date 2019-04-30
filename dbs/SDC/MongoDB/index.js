const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://34.238.50.168/';

const getRecs = (id, callback) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log(`Error connecting to DB, ${err}`)
      throw err;
    }
    console.log(`Connected to airbnb database`)
    let db = client.db('airbnb');
    db.collection('recommendations').find({RoomId: +id}).toArray((err, results) => {
      if (err) throw err;
      console.log(`Results of db lookup: ${JSON.stringify(results)}`);
      callback(null, JSON.stringify(results));
    });
  });
}


module.exports = getRecs;