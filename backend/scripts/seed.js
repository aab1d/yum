import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import userModel from "../models/user.model.js";
import restaurantModel from "../models/restaurant.model.js";

dotenv.config();

const NUM_OWNERS = 8;
const NUM_RESTAURANTS = 30;

const sampleNames = [
  "Spice Route",
  "The Golden Fork",
  "Urban Kitchen",
  "Cafe Nomad",
  "Green Bowl",
  "Sunset Diner",
  "Bella Tavola",
  "The Rustic Table",
];

const sampleAddresses = [
  "12 Main St",
  "45 Park Ave",
  "78 Lake Rd",
  "9 River Ln",
  "23 Hill St",
];

const sampleImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
  "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
  "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=800",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
  "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800",
];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    // wipe existing dummy data (careful in a real environment!)
    await restaurantModel.deleteMany({});
    await userModel.deleteMany({ role: "restaurant" });

    // 1. create restaurant-role owner accounts
    const hashedPassword = await bcrypt.hash("password123", 10);
    const owners = [];
    for (let i = 0; i < NUM_OWNERS; i++) {
      const owner = await userModel.create({
        firstName: `Owner${i}`,
        lastName: "Test",
        mobileNumber: `90000000${i}`,
        email: `owner${i}@test.com`,
        password: hashedPassword,
        role: "restaurant",
      });
      owners.push(owner);
    }
    console.log(`Created ${owners.length} restaurant owners`);

    // 2. create restaurants, each assigned a random owner and image
    const restaurants = [];
    for (let i = 0; i < NUM_RESTAURANTS; i++) {
      restaurants.push({
        name: `${randomFrom(sampleNames)} ${i}`,
        ownerId: randomFrom(owners)._id,
        address: `${randomFrom(sampleAddresses)}, City ${i % 5}`,
        image: randomFrom(sampleImages),
        description: "A great place to eat.",
      });
    }
    await restaurantModel.insertMany(restaurants);
    console.log(`Created ${restaurants.length} restaurants`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
