require('dotenv').config(); // Load environment variables from .env file
const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.set("strictQuery", true);
  try {
    const uri = process.env.MONGO; // Use the MONGO_URI environment variable
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional options if needed
    };

    await mongoose.connect(uri, options);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit with a failure status
  }
};

module.exports = connectDB;
