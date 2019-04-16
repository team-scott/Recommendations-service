const db = require('../../dbs/db')

module.exports.get=function(query, params) {
  return new Promise(function(resolve, reject) {
      if(params == undefined) params=[]
      db.all(query, params, function(err, rows)  {
          if(err) reject("Read error: " + err.message)
          else {
            resolve(rows)
          }
      })
  }) 
}
