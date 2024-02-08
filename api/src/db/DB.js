import { connect, set } from "mongoose";

export const connectDB = async () => {
  set("strictQuery", true)
  try {
    await connect(process.env.DATABASE);
    console.log(`MongoDB Connected........`);
  } catch (error) {
    console.log(error);
  }
};


