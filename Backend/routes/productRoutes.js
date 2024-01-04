// import the express library
import express from "express";

// create a router instance
const router = express.Router();

// define a get request to the "/api/products" endpoint
router.get("/", (req, res) => {
  // return all products as a JSON object
  res.json(products);
});

// define a get request to the "/api/products/:id" endpoint
router.get("/:id", (req, res) => {
  // find the product with the given id in the products array
  const product = products.find((p) => p._id === req.params.id);

  // return the product as a JSON object
  res.send(product);
});

// export the router for use in other files
export default router;
