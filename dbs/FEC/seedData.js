const sqlite3 = require('sqlite3').verbose();
const {roomSchema, recSchema, dropRec, dropRoom} = require('./schema')
const fakeData = require('./fakeData')

var seedData = (fakeRecData) => {
    let db = new sqlite3.Database('./recommendations.db', (err) => {
      if (err) {
        console.error(err.message)
      }
      console.log('Connected to the recommendations database');
    });
    db.serialize(() => {
      db.run(dropRec)
      .run(dropRoom)
      .run(roomSchema)
      .run(recSchema)
      .run(`insert into recommendations (id, recimg, recdetails, rectitle, recCost, recRating, recratingCount, roomId)
      values ${fakeRecData};`)
    })
    db.close(err => {
      if (err) {
        return console.err(err.message)
      }
    });
  }
fakeData.fakeRecData()
.then(fakeRecData => seedData(fakeRecData))
