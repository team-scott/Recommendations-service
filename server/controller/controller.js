const getRecs = require('../../dbs/SDC/MongoDB/index.js');

module.exports = {
  getRoomRecommendations: function(req, res, next) {
    let roomNum = req.params.room 
    getRecs(roomNum, (err, results)=>{
      if (err) {
        console.log(`error looking up recommendations, ${err}`)
      }
      console.log(`results from Mongo look like: ${results}`)
      res.send(results)
    })
  }
};