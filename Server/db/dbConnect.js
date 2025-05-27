import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/mydatabase";
const DB_NAME = process.env.DB_NAME || "mydatabase";

const DBConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `Connected to MongoDB database: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default DBConnect;
