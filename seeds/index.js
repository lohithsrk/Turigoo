if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60cb64f84448a11618089b8b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                "coordinates": [
                  cities[random1000].longitude,
                  cities[random1000].latitude
                ],
                "type": "Point"
            },
            image: [
                {
                  url: "https://www.treehugger.com/thmb/nZJNVsrHSBcaEVNnrIyVIj9IMKM=/2121x1414/filters:fill(auto,1)/GettyImages-1273584292-cbcd5f85f4c646d58f7a7fa158dcaaeb.jpg",
                  filename: "Turigoo/fweehdijogk7heb1vess"
                },
                {
                  url: "https://res.cloudinary.com/dhkncompx/image/upload/v1623903538/Turigoo/ocdz7qmiubarkwviiogj.jpg",
                  filename: "Turigoo/ocdz7qmiubarkwviiogj"
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})