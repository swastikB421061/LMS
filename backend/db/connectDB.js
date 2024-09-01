import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const conn = await mongoose
      .connect(process.env.MONGO_URI)
      .then(console.log("db connected"));
  } catch (error) {
    confirm.log("error",error);
    process.exit(1);
  }
};

export default connectMongoDB;
