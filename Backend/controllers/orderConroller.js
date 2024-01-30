import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create new order
//@route POST /api/orders
//@acess private
const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    itemsPrice,
    shippingPrice,
    paymentMethod,
    taxPrice,
    totalPrice,
    shippingAddress, // Corrected here
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ error: "No item in the cart" });
    throw new Error("No item in the cart");
  } else {
    const userId = req.user ? req.user._id : null;

    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: userId, // Corrected here
      itemsPrice,
      shippingPrice,
      paymentMethod,
      taxPrice,
      totalPrice,
      shippingAddress, // Corrected here
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc get logged in users orders
//@route Get /api/orders/myorders
//@acess private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc get order by id
//@route Get /api/orders/:id
//@acess private
const getMyOrdersById = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id}).populate("user", "name,email");

  if (order){
    res.status(200).json(order);
  }else{
    res.status(404).json({error:"Order not found!"});
    throw new Error("Order not found!")
  }
  
});

// @desc get update order to paid
//@route Get /api/orders/:id/pay
//@acess private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send(" update Order To Paid");
  // const order = new Order({});
});

// @desc get update order to delivered
//@route Get /api/orders/:id/deliver
//@acess private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send(" update Order To deliver");
});

// @desc get all oreders
//@route Get /api/orders/:id/pay
//@acess private
const getOrders = asyncHandler(async (req, res) => {
  res.send(" get all oreders");
  // const order = new Order({});
});

export {
  getMyOrders,
  addOrderItem,
  getMyOrdersById,
  updateOrderToDelivered,
  getOrders,
  updateOrderToPaid,
};
