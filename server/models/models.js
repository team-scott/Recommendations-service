const getRecs = require('../../dbs/SDC/MongoDB/index.js');

module.exports.get = function(query) {
  return new Promise(function(resolve, reject) {
    connect.then(() => {
      db.collection('recommendations').find(query, function(err, rows) {
        if (err) {
          reject('Read error: ' + err.message);
        } else {
          resolve(rows);
        }
      });
    });
  });
};
