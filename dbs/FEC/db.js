const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db = new sqlite3.Database(
  path.join(__dirname, 'recommendations.db'),
  err => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database');
  }
);

module.exports = db;
