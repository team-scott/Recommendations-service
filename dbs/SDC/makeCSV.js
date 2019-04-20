const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    { id: 'recImg', title: 'RecImg' },
    { id: 'recDetails', title: 'RecDetails' },
    { id: 'recTitle', title: 'RecTitle' },
    { id: 'recCost', title: 'RecCost' },
    { id: 'recRating', title: 'RecRating' },
    { id: 'recRatingCount', title: 'RecRatingCount' },
    { id: 'roomId', title: 'RoomId' }
  ]
});

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
  while (recSeeds.length < 10000) {
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

let batches = 0;
let append = () => {
  if (batches < 1000) {
    batches += 1;
    let data = recSeeder();
    csvWriter.writeRecords(data).then(() => append());
  } else {
    console.timeEnd('writeCSV')
    console.log('The CSV file was written successfully');
  }
};

console.time('writeCSV');
append();