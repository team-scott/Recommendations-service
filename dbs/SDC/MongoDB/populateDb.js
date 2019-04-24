const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'airbnb';

// Create a new MongoClient
const client = new MongoClient(url);

// Helper functions to generate seeding data
const images = [
  'https://airbnb-recommendations.s3.amazonaws.com/austin-schmid-134032-unsplash.jpg',
  'https://airbnb-recommendations.s3.amazonaws.com/bethany-legg-3373-unsplash.jpg',
  'https://airbnb-recommendations.s3.amazonaws.com/brick-country-home.jpg',
  'https://airbnb-recommendations.s3.amazonaws.com/denise-johnson-426669-unsplash.jpg',
  'https://airbnb-recommendations.s3.amazonaws.com/house-exterior-in-tropics.jpg',
  'https://airbnb-recommendations.s3.amazonaws.com/jasper-van-der-meij-104066-unsplash.jpg',
  'https://airbnb-recommendations.s3.amazonaws.com/magnus-lindvall-4409-unsplash.jpg',
  'https://airbnb-recommendations.s3.amazonaws.com/pexels-photo-371589.jpeg',
  'https://airbnb-recommendations.s3.amazonaws.com/pexels-photo-414171.jpeg',
  'https://airbnb-recommendations.s3.amazonaws.com/pexels-photo-462024.jpeg',
  'https://airbnb-recommendations.s3.amazonaws.com/pexels-photo-540518.jpeg',
  'https://airbnb-recommendations.s3.amazonaws.com/the-roaming-platypus-311630-unsplash.jpg',
  'https://airbnb-recommendations.s3.amazonaws.com/tommy-lisbin-532069-unsplash.jpg',
  'https://airbnb-recommendations.s3.amazonaws.com/yellow-door-on-brick-home.jpg'
];

let recSeeder = () => {
  let recSeeds = [];
  while (recSeeds.length < 1000) {
    recSeeds.push({
      recImg: images[Math.floor(Math.random() * Math.floor(images.length))],
      recDetails: faker.lorem.sentence(),
      recTitle: faker.lorem.sentence(),
      recCost: '' + faker.random.number({ min: 1, max: 100 }),
      recRating: '' + faker.random.number({ min: 3, max: 5 }),
      recRatingCount: '' + faker.random.number({ min: 40, max: 100 }),
      roomId: '' + faker.random.number({ min: 1, max: 10000000 })
    });
  }
  return recSeeds;
};

client
  .connect()
  .then(client => {
    console.log('MongoDB: CONNECTED TO DATABASE');
    const db = client.db(dbName);

    // Insert 1000 documents, 10000 times

    let recsBatchCount = 0;
    let addRecs = () => {
      if (recsBatchCount < 10000) {
        recsBatchCount += 1;
        let recDocs = recSeeder();
        db.collection('recommendations').insertMany(recDocs, (err, res) => {
          addRecs();
        });
      } else {
        console.timeEnd('dbSave')
        console.log('all documents seeded');
      }
    };
    
    console.time('dbSave');
    addRecs();
  })
  .catch(err => console.log(`MongoDB: DATABASE ERROR --> ${err}`));
