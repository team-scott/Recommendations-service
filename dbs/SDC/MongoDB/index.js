const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'airbnb';

// Create a new MongoClient
const client = new MongoClient(url);

const db = client.db(dbName);

client
  .connect()
  .then(() => console.log('MongoDB: CONNECTED TO DATABASE'))
  .catch(err => console.log(`MongoDB: DATABASE ERROR --> ${err}`));

module.exports = db;
