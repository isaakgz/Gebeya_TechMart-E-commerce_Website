import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import products from "./data/products.js";
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT || 8000;

//connect to mongodb
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("wellocme");
});

app.use("/api/products", productRoutes)

app.listen(port, () => {
  console.log(`server is listing on ${port}`);
});
