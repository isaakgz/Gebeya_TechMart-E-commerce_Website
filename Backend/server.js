import path from 'path';

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddelware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoute.js";
const port = process.env.PORT || 8000;

await connectDB();
const app = express();



//body parser miidelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middilewre
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("wellocme");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);


//upload route
app.use('/api/upload', uploadRoutes);

//paypal route
app.get('/api/config/paypal', (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//upload route


// Global Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is listing on ${port}`);
});
