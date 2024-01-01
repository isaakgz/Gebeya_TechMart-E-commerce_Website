import mongoose from "mongoose";

//connecting to mongodob database
const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "server is connceted to mongodb server: ",
      result.connection.host
    );
  } catch (error) {
    console.log("error connection to database", error);

    // Terminate the entire process
    process.exit(1);
  }
};

export default connectDB;
