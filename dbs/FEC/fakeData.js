const faker = require('faker');
const aws = require('aws-sdk');
const dotenv = require("dotenv")
dotenv.config({
  path: '../../.env'
})

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var s3 = new aws.S3({ accessKeyId: process.env.awsAccessKey, secretAccessKey: process.env.awsSecretKey});

var params = {
  Bucket: 'airbnb-recommendations', /* required */
};

module.exports.fakeRecData = function getItems() {
  return new Promise((resolve, reject) => {
    var urls = []
    s3.listObjectsV2(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else  {
        let bucketContent = data.Contents
        for (item of bucketContent) {
          urls.push(`https://airbnb-recommendations.s3.amazonaws.com/${item.Key}`)
        }
        resolve(urls)
      } 
    })
  })
  .then(imageUrls => {
    var seedRecArray = [...Array(100).keys()]
    var dupRecArray = seedRecArray.reduce(function (res, current, index, array) {
    return res.concat([current, current, current, current, current]);
    }, []);
    var shuffledRecArray = shuffle(dupRecArray)
    var recommendations = ''
    for (var i=0; i < 500; i++) {
    const recommendation = `(
      ${parseInt(i) +1},
      "${imageUrls[Math.floor(Math.random() * Math.floor(imageUrls.length))]}",  
      "${faker.lorem.sentence()}", 
      "${faker.lorem.sentence()}", 
      ${Math.floor(Math.random() *100 * Math.floor(10)).toString()},
      ${(Math.floor(Math.random() * 3) + 3).toString()},
      ${(Math.floor(Math.random()*100) +40).toString()},
      ${(shuffledRecArray[i]).toString()}
    )`
    recommendations = recommendations + ', '+recommendation
    }
  
    return recommendations.slice(1)
  })
}




