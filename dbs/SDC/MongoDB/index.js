const mongoUtil = require('./mongoUtil.js')

var db = mongoUtil.getDb();

const getRecs = (id, callback) => {
  db.collection('recommendations').find({RoomId: +id}).toArray((err, results) => {
    if (err) throw err;
    console.log(`Results of db lookup: ${JSON.stringify(results)}`);
    callback(null, JSON.stringify(results));
  });
};

module.exports = getRecs;