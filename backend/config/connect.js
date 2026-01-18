import mongoose from "mongoose";

const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error Occurred", error);
  }
};

export { connectMongoose };
