import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/user.js";
import products from "./data/products.js";
import User from "./models/userModels.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDb from "./config/db.js";

dotenv.config();

// Define a function to import the data into the database
const importdata = async () => {
  try {

    // Connect to the database
    await connectDb();

    // Delete any existing data from the Order, Product, and User collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Create new users in the database using the imported data
    const createdUsers = await User.insertMany(users);

     // Select the admin user from the imported users
    const adminUser = createdUsers[0]._id; 

    // Modify the imported products to include the admin user as the owner of each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Create new products in the database using the modified imported data
    await Product.insertMany(sampleProducts);
    console.log("Data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`error importing data ${error}`.red.bold);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDb()
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importdata();
}

// destroyData()
