import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    // If already connected, don't connect again
    if (mongoose.connection.readyState >= 1) {
      return;
    } 
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to database");
  }
};

export default connectToDatabase;