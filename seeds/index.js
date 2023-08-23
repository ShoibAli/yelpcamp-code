const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedhelper");
const Campground = require("../models/campground");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("mongo is connected");
}
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '64d88758773e49c1b187073c',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dcvaztnob/image/upload/v1692380646/yelpcamp/zfrmglfdvwbsddvzjlpr.jpg',
          filename: 'yelpcamp/zfrmglfdvwbsddvzjlpr'
        },
        {
          url: 'https://res.cloudinary.com/dcvaztnob/image/upload/v1692380651/yelpcamp/q7mgatedabeytkou6rh2.jpg',
          filename: 'yelpcamp/q7mgatedabeytkou6rh2',
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
