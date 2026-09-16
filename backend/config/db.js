import mongoose from "mongoose";
import "dotenv/config";
const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.connect(URI);
    console.log("Database connected!");
  } catch (err) {
    console.log("Failed to connect database!", err);
  }
};

export default connectDB;
