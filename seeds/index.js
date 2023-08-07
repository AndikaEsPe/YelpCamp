const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
  console.log("Connection Open!");
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i ++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64bf5fde145106d13a0ba10c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi laboriosam minus rerum cumque numquam mollitia error, tenetur aliquam maxime totam nam repellendus eveniet eos voluptatem quam nihil tempore doloribus fugiat.',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dearql1iq/image/upload/v1690684406/YelpCamp/u4hbkrbalwwdnwbezsmi.jpg',
                    filename: 'YelpCamp/u4hbkrbalwwdnwbezsmi',
                  },
                  {
                    url: 'https://res.cloudinary.com/dearql1iq/image/upload/v1690684407/YelpCamp/oy0piztpmztunahd0qid.jpg',
                    filename: 'YelpCamp/oy0piztpmztunahd0qid',
                  }
              
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});