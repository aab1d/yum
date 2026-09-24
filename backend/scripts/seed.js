import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import userModel from "../models/user.model.js";
import restaurantModel from "../models/restaurant.model.js";
import foodModel from "../models/food.model.js";

dotenv.config();

const NUM_OWNERS = 8;
const NUM_RESTAURANTS = 30;
const FOODS_PER_RESTAURANT_MIN = 3;
const FOODS_PER_RESTAURANT_MAX = 8;

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

const sampleFoodNames = [
  "Margherita Pizza",
  "Chicken Tikka Masala",
  "Classic Cheeseburger",
  "Caesar Salad",
  "Pad Thai",
  "Beef Tacos",
  "Sushi Platter",
  "Butter Chicken",
  "Veggie Wrap",
  "French Fries",
  "Grilled Salmon",
  "Mushroom Risotto",
  "BBQ Ribs",
  "Falafel Bowl",
  "Chocolate Brownie",
];

const sampleFoodImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
  "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomPrice = () => Number((Math.random() * (25 - 5) + 5).toFixed(2));

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    // wipe existing dummy data (careful in a real environment!)
    await foodModel.deleteMany({});
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
    const restaurantsToInsert = [];
    for (let i = 0; i < NUM_RESTAURANTS; i++) {
      restaurantsToInsert.push({
        name: `${randomFrom(sampleNames)} ${i}`,
        ownerId: randomFrom(owners)._id,
        address: `${randomFrom(sampleAddresses)}, City ${i % 5}`,
        image: randomFrom(sampleImages),
        description: "A great place to eat.",
      });
    }
    const restaurants = await restaurantModel.insertMany(restaurantsToInsert);
    console.log(`Created ${restaurants.length} restaurants`);

    // 3. create foods for each restaurant
    const foodsToInsert = [];
    for (const restaurant of restaurants) {
      const foodCount = randomInt(
        FOODS_PER_RESTAURANT_MIN,
        FOODS_PER_RESTAURANT_MAX,
      );
      const usedNames = new Set();
      for (let i = 0; i < foodCount; i++) {
        let name = randomFrom(sampleFoodNames);
        // avoid duplicate food names within the same restaurant
        // (checkDuplicate on the real API scopes uniqueness per restaurant)
        let attempts = 0;
        while (usedNames.has(name) && attempts < 10) {
          name = randomFrom(sampleFoodNames);
          attempts++;
        }
        usedNames.add(name);

        foodsToInsert.push({
          name,
          price: randomPrice(),
          restaurantId: restaurant._id,
          image: randomFrom(sampleFoodImages),
          description: "Freshly made and delicious.",
        });
      }
    }
    await foodModel.insertMany(foodsToInsert);
    console.log(`Created ${foodsToInsert.length} food items`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
