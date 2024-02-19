import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {

  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments();

  const products = await Product.find({}).limit(pageSize).skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// Find the product with the given id using Product.findById
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // If the product is found, send it as JSON response
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc ccreate new product
//@route post /api/Products/
//@acess private admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc update a  product
//@route Put /api/Products/
//@acess private admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    user,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    (product.name = name),
      (product.price = price),
      (product.user = user),
      (product.image = image),
      (product.brand = brand),
      (product.category = category),
      (product.countInStock = countInStock),
      (product.numReviews = numReviews),
      (product.description = description);
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("resourse not found")
  }
});


// @desc delete a  product
//@route DElETE /api/Products/:id
//@acess private admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
}
);


// @desc create a new review
//@route post /api/Products/:id/reviews
//@acess private 


const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400).json({ message: "product already reviewed" });
      throw new Error("product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404).json({ message: "product not found" });
    throw new Error("product not found");
  }
}
);








export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview };
