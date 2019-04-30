const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://34.238.50.168:21017";

var _db;

module.exports = {

  connectToServer: ( callback ) => {
    MongoClient.connect( url,  { useNewUrlParser: true }, ( err, client ) => {
      _db  = client.db('airbnb');
      return callback( err );
    } );
  },

  getDb: () => {
    return _db;
  }
};