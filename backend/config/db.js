import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  try {
    // MONGO_URI should be defined in .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Stop the app if connection fails
  }
};

export default connectDB;
